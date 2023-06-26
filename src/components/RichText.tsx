import dynamic from 'next/dynamic';
import Script from 'next/script';

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


  const handleTweetButtonClick = (editor: any) => {
    const tweetHTML = prompt('Insira o código HTML do tweet:');
    if (tweetHTML) {
      if (typeof window !== "undefined") {
        const test = tweetHTML.split('<script')
        editor.s.insertHTML(`<div style="display: block; margin-left: auto; margin-right: auto;">${test[0]}</div>`);
      }
    }
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
              list: ['8', '10', '12', '14', '16', '21', '18', '20', '24', '30', '36', '48', '72'],
            },
          },
          iframe: true,
          extraButtons: [
            {
              text: 'tweet',
              exec: handleTweetButtonClick,
            },
          ],
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
