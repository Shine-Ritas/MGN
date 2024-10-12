
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import { Button } from "@/components/ui/button"
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify,
  Heading4,
} from 'lucide-react'
import { useEffect } from 'react'

interface FormInputProps {
  placeholder?: string;
  defaultValue?: string;
  register?: any;
  disabled?: boolean;
}

interface ReusableRichTextEditorProps extends FormInputProps {
  className?: string;
  onChange?: (content: string) => void;
}

export default function ReusableRichTextEditor({
  placeholder = "",
  defaultValue = "",
  register,
  className = "",
  disabled = false,
  onChange
}: ReusableRichTextEditorProps) {
  const editor = useEditor({
    extensions: [
        StarterKit.configure({
            paragraph: {
              keepMarks: true,
            },
          }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyle,
    ],
    content: defaultValue,
    editable: !disabled,
    editorProps: {
      attributes: {
        class: 'outline-none prose max-w-none p-4 min-h-[200px] text-foreground prose-headings:text-foreground',  // Ensure styles are applied
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
  })

  useEffect(() => {
    if (editor && !editor.isDestroyed) {
      editor.setOptions({ editable: !disabled })
    }
  }, [editor, disabled])

  if (!editor) {
    return null
  }

  const toggleStyle = (style: string) => {
    switch (style) {
      case 'bold':
        editor.chain().focus().toggleBold().run()
        break
      case 'italic':
        editor.chain().focus().toggleItalic().run()
        break
      case 'underline':
        editor.chain().focus().toggleUnderline().run()
        break
      case 'h':
        editor.chain().focus().toggleHeading({ level: 4 }).run()
        break
     
    
    }
  }

  const setTextAlign = (align: 'left' | 'center' | 'right' | 'justify') => {
    editor.chain().focus().setTextAlign(align).run()
  }

  return (
    <div className="w-full">
      <div className="mt-2 mb-4 flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => toggleStyle('bold')}
          className={editor.isActive('bold') ? 'bg-muted' : ''}
          disabled={disabled}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => toggleStyle('italic')}
          className={editor.isActive('italic') ? 'bg-muted' : ''}
          disabled={disabled}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => toggleStyle('underline')}
          className={editor.isActive('underline') ? 'bg-muted' : ''}
          disabled={disabled}
        >
          <UnderlineIcon className="h-4 w-4" />
        </Button>

        {/* Text alignment buttons */}
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => setTextAlign('left')}
          className={editor.isActive({ textAlign: 'left' }) ? 'bg-muted' : ''}
          disabled={disabled}
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => setTextAlign('center')}
          className={editor.isActive({ textAlign: 'center' }) ? 'bg-muted' : ''}
          disabled={disabled}
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => setTextAlign('right')}
          className={editor.isActive({ textAlign: 'right' }) ? 'bg-muted' : ''}
          disabled={disabled}
        >
          <AlignRight className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => setTextAlign('justify')}
          className={editor.isActive({ textAlign: 'justify' }) ? 'bg-muted' : ''}
          disabled={disabled}
        >
          <AlignJustify className="h-4 w-4" />
        </Button>
        {/* Heading buttons */}
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => toggleStyle('h')}
          className={editor.isActive('heading', { level: 1 }) ? 'bg-muted' : ''}
          disabled={disabled}
        >
          <Heading4 className="h-4 w-4" />
        </Button>
       
      </div>

      <div 
        className={`border rounded-md overflow-hidden resize-y ${className} `}
        onClick={() => editor.chain().focus().run()} >
            <EditorContent 
            editor={editor} 
            placeholder={placeholder}
            {...register}
            defaultValue={defaultValue}
        />
      </div>
    </div>
  )
}
