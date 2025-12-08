import { useRef, useEffect, useState } from "react";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaListUl,
  FaListOl,
  FaLink,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaCode,
  FaStrikethrough,
  FaQuoteLeft,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { LinkModal, ImageModal } from "./EditorModals";

interface ImageData {
  element: HTMLImageElement;
  initialWidth: number;
  initialHeight: number;
}

interface LinkData {
  element: HTMLAnchorElement;
  url: string;
  text: string;
}

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: string;
}

const RichTextEditor = ({
  value,
  onChange,
  placeholder = "Write your content here...",
  height = "400px",
}: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [selectedLink, setSelectedLink] = useState<LinkData | null>(null);
  const [editingLink, setEditingLink] = useState(false);
  const [linkEditUrl, setLinkEditUrl] = useState("");
  const [linkEditText, setLinkEditText] = useState("");
  const [savedLinkRange, setSavedLinkRange] = useState<Range | null>(null);

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value;
      attachImageHandlers();
      attachLinkHandlers();
    }
  }, [value]);

  useEffect(() => {
    attachImageHandlers();
    attachLinkHandlers();
  }, [value]);

  const attachImageHandlers = () => {
    if (!editorRef.current) return;

    const images = editorRef.current.querySelectorAll("img");
    images.forEach((img) => {
      img.style.cursor = "pointer";
      img.classList.add("editable-image");

      img.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        selectImage(img as HTMLImageElement);
      };
    });
  };

  const attachLinkHandlers = () => {
    if (!editorRef.current) return;

    const links = editorRef.current.querySelectorAll("a");
    links.forEach((link) => {
      link.style.cursor = "pointer";
      link.classList.add("editable-link");

      link.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        selectLink(link as HTMLAnchorElement);
      };
    });
  };

  const selectImage = (img: HTMLImageElement) => {
    if (selectedImage) {
      selectedImage.element.classList.remove("selected-image");
    }

    img.classList.add("selected-image");
    setSelectedImage({
      element: img,
      initialWidth: img.offsetWidth,
      initialHeight: img.offsetHeight,
    });
    setSelectedLink(null);
  };

  const selectLink = (link: HTMLAnchorElement) => {
    if (selectedLink) {
      selectedLink.element.classList.remove("selected-link");
    }

    link.classList.add("selected-link");
    setSelectedLink({
      element: link,
      url: link.href,
      text: link.textContent || "",
    });
    setSelectedImage(null);
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
      attachImageHandlers();
      attachLinkHandlers();
    }
  };

  const executeCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleInput();
  };

  const handleInsertLink = (url: string, text: string) => {
    const displayText = text || url;
    const linkId = `link-${Date.now()}`;
    const link = `<a href="${url}" id="${linkId}" target="_blank" rel="noopener noreferrer" class="editable-link" style="color: #059669; text-decoration: underline; cursor: pointer;">${displayText}</a>&nbsp;`;

    if (editorRef.current) {
      editorRef.current.focus();

      const selection = window.getSelection();
      let range: Range | null = savedLinkRange;

      if (!range && selection && selection.rangeCount > 0) {
        range = selection.getRangeAt(0);
      }

      if (range && selection) {
        selection.removeAllRanges();
        selection.addRange(range);
        range.deleteContents();
        const fragment = range.createContextualFragment(link);
        range.insertNode(fragment);

        const lastNode = fragment.lastChild;
        if (lastNode) {
          range.setStartAfter(lastNode);
          range.collapse(true);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      } else {
        editorRef.current.innerHTML += link;
      }

      handleInput();

      setTimeout(() => {
        const newLink = editorRef.current?.querySelector(
          `#${linkId}`
        ) as HTMLAnchorElement;
        if (newLink) {
          newLink.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            selectLink(newLink);
          };
        }
      }, 100);

      setSavedLinkRange(null);
    }
  };

  const handleEditLink = () => {
    if (!selectedLink) return;

    setLinkEditUrl(selectedLink.url);
    setLinkEditText(selectedLink.text);
    setEditingLink(true);
  };

  const handleUpdateLink = () => {
    if (!selectedLink || !linkEditUrl) return;

    selectedLink.element.href = linkEditUrl;
    selectedLink.element.textContent = linkEditText || linkEditUrl;
    setEditingLink(false);
    setSelectedLink(null);
    handleInput();
  };

  const handleDeleteLink = () => {
    if (!selectedLink) return;

    const text = document.createTextNode(selectedLink.text);
    selectedLink.element.replaceWith(text);
    setSelectedLink(null);
    handleInput();
  };

  const handleInsertImage = async (file: File) => {
    setUploadProgress(0);

    const reader = new FileReader();

    reader.onprogress = (e) => {
      if (e.lengthComputable) {
        const progress = (e.loaded / e.total) * 100;
        setUploadProgress(Math.round(progress));
      }
    };

    reader.onloadstart = () => {
      setUploadProgress(0);
    };

    reader.onload = (e) => {
      const imgSrc = e.target?.result as string;
      const imgId = `img-${Date.now()}`;

      const tempImg = new Image();
      tempImg.onload = () => {
        const naturalWidth = tempImg.naturalWidth;
        let widthStyle = "max-width: 100%;";

        if (naturalWidth > 800) {
          widthStyle = "width: 25%; max-width: 100%;";
        }

        const img = `<img src="${imgSrc}" id="${imgId}" alt="${file.name}" class="editable-image" style="${widthStyle} height: auto; margin: 5px; border-radius: 8px; cursor: pointer; transition: all 0.2s; display: inline-block; vertical-align: top;" data-original-width="${naturalWidth}" />`;

        if (editorRef.current) {
          const selection = window.getSelection();
          let savedRange: Range | null = null;

          if (selection && selection.rangeCount > 0) {
            savedRange = selection.getRangeAt(0).cloneRange();
          }

          editorRef.current.focus();

          if (savedRange) {
            selection?.removeAllRanges();
            selection?.addRange(savedRange);

            const range = savedRange;
            range.deleteContents();
            const fragment = range.createContextualFragment(img);
            range.insertNode(fragment);

            const spaceNode = document.createTextNode(" ");
            range.insertNode(spaceNode);
            range.setStartAfter(spaceNode);
            range.collapse(true);
            selection?.removeAllRanges();
            selection?.addRange(range);
          } else {
            editorRef.current.innerHTML += img + " ";
          }

          handleInput();

          setTimeout(() => {
            const newImg = editorRef.current?.querySelector(
              `#${imgId}`
            ) as HTMLImageElement;
            if (newImg) {
              newImg.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                selectImage(newImg);
              };
            }
          }, 100);
        }

        setTimeout(() => {
          setUploadProgress(null);
        }, 1000);
      };

      tempImg.src = imgSrc;
    };

    reader.onerror = () => {
      setUploadProgress(null);
      alert("Failed to upload image");
    };

    reader.readAsDataURL(file);
  };

  const handleResizeImage = (percentage: number) => {
    if (!selectedImage) return;

    const newWidth = (selectedImage.initialWidth * percentage) / 100;
    selectedImage.element.style.width = `${newWidth}px`;
    selectedImage.element.style.height = "auto";
    handleInput();
  };

  const handleDeleteImage = () => {
    if (!selectedImage) return;

    selectedImage.element.remove();
    setSelectedImage(null);
    handleInput();
  };

  const handleAlignImage = (alignment: string) => {
    if (!selectedImage) return;

    selectedImage.element.style.display = "block";
    if (alignment === "left") {
      selectedImage.element.style.marginLeft = "0";
      selectedImage.element.style.marginRight = "auto";
    } else if (alignment === "center") {
      selectedImage.element.style.marginLeft = "auto";
      selectedImage.element.style.marginRight = "auto";
    } else if (alignment === "right") {
      selectedImage.element.style.marginLeft = "auto";
      selectedImage.element.style.marginRight = "0";
    }
    handleInput();
  };

  const formatBlock = (tag: string) => {
    executeCommand("formatBlock", tag);
  };

  return (
    <div className="rich-text-editor border border-gray-300 rounded-lg overflow-hidden shadow-sm">
      {}
      <div className="bg-linear-to-r from-gray-50 to-gray-100 border-b border-gray-300 p-3">
        <div className="flex flex-wrap gap-2">
          {}
          <div className="flex gap-1 bg-white rounded-md p-1 shadow-sm">
            <button
              type="button"
              onClick={() => executeCommand("bold")}
              className="p-2 hover:bg-green-50 hover:text-green-700 rounded transition-colors"
              title="Bold (Ctrl+B)"
            >
              <FaBold />
            </button>
            <button
              type="button"
              onClick={() => executeCommand("italic")}
              className="p-2 hover:bg-green-50 hover:text-green-700 rounded transition-colors"
              title="Italic (Ctrl+I)"
            >
              <FaItalic />
            </button>
            <button
              type="button"
              onClick={() => executeCommand("underline")}
              className="p-2 hover:bg-green-50 hover:text-green-700 rounded transition-colors"
              title="Underline (Ctrl+U)"
            >
              <FaUnderline />
            </button>
            <button
              type="button"
              onClick={() => executeCommand("strikeThrough")}
              className="p-2 hover:bg-green-50 hover:text-green-700 rounded transition-colors"
              title="Strikethrough"
            >
              <FaStrikethrough />
            </button>
          </div>

          {}
          <div className="flex gap-1 bg-white rounded-md p-1 shadow-sm">
            <select
              onChange={(e) => formatBlock(e.target.value)}
              className="px-3 py-2 border-0 rounded text-sm font-medium hover:bg-green-50 cursor-pointer focus:ring-2 focus:ring-green-500"
              defaultValue=""
            >
              <option value="">Paragraph</option>
              <option value="h1">Heading 1</option>
              <option value="h2">Heading 2</option>
              <option value="h3">Heading 3</option>
              <option value="h4">Heading 4</option>
              <option value="h5">Heading 5</option>
              <option value="h6">Heading 6</option>
            </select>
          </div>

          {}
          <div className="flex gap-1 bg-white rounded-md p-1 shadow-sm">
            <button
              type="button"
              onClick={() => executeCommand("insertUnorderedList")}
              className="p-2 hover:bg-green-50 hover:text-green-700 rounded transition-colors"
              title="Bullet List"
            >
              <FaListUl />
            </button>
            <button
              type="button"
              onClick={() => executeCommand("insertOrderedList")}
              className="p-2 hover:bg-green-50 hover:text-green-700 rounded transition-colors"
              title="Numbered List"
            >
              <FaListOl />
            </button>
            <button
              type="button"
              onClick={() => executeCommand("formatBlock", "blockquote")}
              className="p-2 hover:bg-green-50 hover:text-green-700 rounded transition-colors"
              title="Quote"
            >
              <FaQuoteLeft />
            </button>
          </div>

          {}
          <div className="flex gap-1 bg-white rounded-md p-1 shadow-sm">
            <button
              type="button"
              onClick={() => executeCommand("justifyLeft")}
              className="p-2 hover:bg-green-50 hover:text-green-700 rounded transition-colors"
              title="Align Left"
            >
              <FaAlignLeft />
            </button>
            <button
              type="button"
              onClick={() => executeCommand("justifyCenter")}
              className="p-2 hover:bg-green-50 hover:text-green-700 rounded transition-colors"
              title="Align Center"
            >
              <FaAlignCenter />
            </button>
            <button
              type="button"
              onClick={() => executeCommand("justifyRight")}
              className="p-2 hover:bg-green-50 hover:text-green-700 rounded transition-colors"
              title="Align Right"
            >
              <FaAlignRight />
            </button>
          </div>

          {}
          <div className="flex gap-1 bg-white rounded-md p-1 shadow-sm">
            <button
              type="button"
              onClick={() => {
                const selection = window.getSelection();
                if (selection && selection.rangeCount > 0) {
                  setSavedLinkRange(selection.getRangeAt(0).cloneRange());
                }
                setShowLinkModal(true);
              }}
              className="p-2 hover:bg-green-50 hover:text-green-700 rounded transition-colors"
              title="Insert Link"
            >
              <FaLink />
            </button>
            <button
              type="button"
              onClick={() => executeCommand("formatBlock", "pre")}
              className="p-2 hover:bg-green-50 hover:text-green-700 rounded transition-colors"
              title="Code Block"
            >
              <FaCode />
            </button>
          </div>

          {}
          <div className="flex gap-2 bg-white rounded-md p-1 shadow-sm items-center">
            <div className="flex flex-col">
              <label className="text-xs text-gray-600 px-1">Text</label>
              <input
                type="color"
                onChange={(e) => executeCommand("foreColor", e.target.value)}
                className="w-10 h-8 cursor-pointer border-0 rounded"
                title="Text Color"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs text-gray-600 px-1">BG</label>
              <input
                type="color"
                onChange={(e) => executeCommand("hiliteColor", e.target.value)}
                className="w-10 h-8 cursor-pointer border-0 rounded"
                title="Background Color"
              />
            </div>
          </div>
        </div>
      </div>

      {}
      {selectedImage && (
        <div className="bg-blue-50 border-b border-blue-200 p-3">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-sm font-semibold text-blue-900">
              Image Selected
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleResizeImage(25)}
                className="px-3 py-1 text-xs bg-white border border-blue-300 rounded hover:bg-blue-100 transition-colors"
              >
                25%
              </button>
              <button
                type="button"
                onClick={() => handleResizeImage(50)}
                className="px-3 py-1 text-xs bg-white border border-blue-300 rounded hover:bg-blue-100 transition-colors"
              >
                50%
              </button>
              <button
                type="button"
                onClick={() => handleResizeImage(75)}
                className="px-3 py-1 text-xs bg-white border border-blue-300 rounded hover:bg-blue-100 transition-colors"
              >
                75%
              </button>
              <button
                type="button"
                onClick={() => handleResizeImage(100)}
                className="px-3 py-1 text-xs bg-white border border-blue-300 rounded hover:bg-blue-100 transition-colors"
              >
                100%
              </button>
            </div>
            <div className="h-6 w-px bg-blue-300"></div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleAlignImage("left")}
                className="px-3 py-1 text-xs bg-white border border-blue-300 rounded hover:bg-blue-100 transition-colors"
              >
                Left
              </button>
              <button
                type="button"
                onClick={() => handleAlignImage("center")}
                className="px-3 py-1 text-xs bg-white border border-blue-300 rounded hover:bg-blue-100 transition-colors"
              >
                Center
              </button>
              <button
                type="button"
                onClick={() => handleAlignImage("right")}
                className="px-3 py-1 text-xs bg-white border border-blue-300 rounded hover:bg-blue-100 transition-colors"
              >
                Right
              </button>
            </div>
            <div className="h-6 w-px bg-blue-300"></div>
            <button
              type="button"
              onClick={handleDeleteImage}
              className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors flex items-center gap-1"
            >
              <FaTrash size={10} /> Delete
            </button>
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="ml-auto px-3 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {}
      {selectedLink && !editingLink && (
        <div className="bg-green-50 border-b border-green-200 p-3">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-sm font-semibold text-green-900">
              Link Selected
            </span>
            <a
              href={selectedLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-green-700 hover:underline max-w-xs truncate"
            >
              {selectedLink.url}
            </a>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleEditLink}
                className="px-3 py-1 text-xs bg-white border border-green-300 rounded hover:bg-green-100 transition-colors flex items-center gap-1"
              >
                <FaEdit size={10} /> Edit
              </button>
              <button
                type="button"
                onClick={handleDeleteLink}
                className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors flex items-center gap-1"
              >
                <FaTrash size={10} /> Remove
              </button>
            </div>
            <button
              type="button"
              onClick={() => setSelectedLink(null)}
              className="ml-auto px-3 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {}
      {editingLink && selectedLink && (
        <div className="bg-green-50 border-b border-green-200 p-3">
          <div className="space-y-2">
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-xs font-medium text-green-900 mb-1">
                  URL
                </label>
                <input
                  type="url"
                  value={linkEditUrl}
                  onChange={(e) => setLinkEditUrl(e.target.value)}
                  className="w-full px-3 py-1.5 text-sm border border-green-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="https://example.com"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-green-900 mb-1">
                  Display Text
                </label>
                <input
                  type="text"
                  value={linkEditText}
                  onChange={(e) => setLinkEditText(e.target.value)}
                  className="w-full px-3 py-1.5 text-sm border border-green-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Link text"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleUpdateLink}
                className="px-4 py-1.5 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors font-medium"
              >
                Update Link
              </button>
              <button
                type="button"
                onClick={() => setEditingLink(false)}
                className="px-4 py-1.5 text-sm bg-gray-200 rounded hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {}
      {uploadProgress !== null && (
        <div className="bg-green-50 border-b border-green-200 p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-green-800">
              Uploading image...
            </span>
            <span className="text-sm font-semibold text-green-800">
              {Math.round(uploadProgress)}%
            </span>
          </div>
          <div className="w-full bg-green-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="p-6 focus:outline-none prose prose-green max-w-none bg-white"
        style={{ minHeight: height }}
        data-placeholder={placeholder}
        suppressContentEditableWarning
      />

      {}
      <LinkModal
        isOpen={showLinkModal}
        onClose={() => {
          setShowLinkModal(false);
          setSavedLinkRange(null);
        }}
        onInsert={handleInsertLink}
      />
      <ImageModal
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        onInsert={handleInsertImage}
      />

      <style>{`
        .rich-text-editor [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
        .rich-text-editor [contenteditable] {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          font-size: 16px;
          line-height: 1.8;
        }
        .rich-text-editor [contenteditable]:focus {
          outline: none;
        }
        .rich-text-editor button {
          color: #374151;
        }
        .rich-text-editor blockquote {
          border-left: 4px solid #059669;
          padding-left: 1rem;
          margin-left: 0;
          font-style: italic;
          color: #4b5563;
        }
        .rich-text-editor pre {
          background-color: #f3f4f6;
          padding: 1rem;
          border-radius: 0.375rem;
          overflow-x: auto;
        }
        .rich-text-editor a {
          color: #059669;
          text-decoration: underline;
        }
        
        .selected-image {
          outline: 3px solid #3b82f6 !important;
          outline-offset: 2px;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .selected-link {
          background: linear-gradient(to bottom, transparent 50%, #86efac 50%) !important;
          background-size: 100% 200%;
          background-position: 0 100%;
          outline: 1px solid #22c55e;
          outline-offset: 2px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .rich-text-editor img {
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .rich-text-editor img:hover {
          opacity: 0.9;
        }
        
        .rich-text-editor a {
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .rich-text-editor a:hover {
          background: rgba(34, 197, 94, 0.1);
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
