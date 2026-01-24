import { toggleFormat, registerFormatType } from "@wordpress/rich-text";
import { RichTextToolbarButton } from "@wordpress/block-editor";

const WORD_SWITCH_FORMAT_TYPE = "word-switch/format-type-delimiter";
const WORD_SWITCH_FORMAT_TYPE_WRAP = "word-switch/format-type-wrap";

const MyMultiTagButton = ({ isActive, value, onChange }) => {
  const selectedString = value.text.substring(value.start, value.end);
  const wordsArray = selectedString.split(",");
  const obj = {
    words: wordsArray,
    currentIndex: 0,
    isFading: false,
  };

  const objString = JSON.stringify(obj);

  const onToggle = () => {
    // Apply the first format
    let nextValue = toggleFormat(value, {
      type: WORD_SWITCH_FORMAT_TYPE_WRAP,
      attributes: {
        "data-wp-interactive": "wpdevagent/word-switch",
        "data-wp-init": "callbacks.init",
        "data-wp-context": objString,
      },
    });
    // Apply the second format to the result of the first
    nextValue = toggleFormat(nextValue, {
      type: WORD_SWITCH_FORMAT_TYPE,
      attributes: {
        "data-wp-text": "state.currentWord",
        "data-wp-class--fade": "context.isFading",
      },
    });

    onChange(nextValue);
  };

  return (
    <RichTextToolbarButton
      icon="editor-code"
      onClick={onToggle}
      title="Word Switch"
      isActive={isActive}
    />
  );
};

registerFormatType(WORD_SWITCH_FORMAT_TYPE, {
  title: "Content",
  tagName: "span",
  className: "word-switch",
  edit: MyMultiTagButton,
});

registerFormatType(WORD_SWITCH_FORMAT_TYPE_WRAP, {
  title: "Wrap",
  tagName: "span",
  className: "word-switch-wrap",
  edit: null,
});
