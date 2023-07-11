import dynamic from 'next/dynamic';

const JoditEditor = dynamic(
  () => import('jodit-react'),
  { ssr: false }
);

type Props = {
  value: string;
  onChange: (newContent: string) => void;
};



export const RichTextEditor = ({ value, onChange }: Props) => {
  const handleEditorChange = (newContent: string) => {
    onChange(newContent);
  };



  return (
    <>
      <JoditEditor
        value={value}
        config={{
          uploader: {
            insertImageAsBase64URI: true,
            imagesExtensions: ['jpg', 'jpeg', 'png', 'gif'],
            filesVariableName: 'files',
          },
          controls: {
            fontsize: {
              list: ['8', '10', '12', '14', '16', '18', '20', '21', '24', '30', '36', '48', '72'],
            },
          },
          iframe: true,
          tabIndex: 1000,
          editHTMLDocumentMode: false,
          zIndex: 1000,
        }}
        onBlur={handleEditorChange}
        onChange={() => { }}
      />
    </>
  );
};
