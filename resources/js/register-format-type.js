/**
 * Toggles a format object to a Rich Text value at the current selection.
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-rich-text/#toggleformat
 *
 * Registers a new format provided a unique name and an object defining its behavior.
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-rich-text/#registerformattype
 */
import { toggleFormat, registerFormatType } from "@wordpress/rich-text";

/**
 * Add a format button to the rich text
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#richtexttoolbarbutton
 */
import { RichTextToolbarButton } from "@wordpress/block-editor";

/**
 * Custom react hook for retrieving props from registered selectors.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-data/#useselect
 */
import { useSelect } from "@wordpress/data";

const WORD_SWITCH_FORMAT_TYPE = "word-switch/format-type-delimiter";
const WORD_SWITCH_FORMAT_TYPE_WRAP = "word-switch/format-type-wrap";

const MyMultiTagButton = ({ isActive, value, onChange }) => {
  const selectedBlock = useSelect((select) => {
    return select("core/block-editor").getSelectedBlock();
  }, []);

  const permittedBlock = ["core/paragraph", "core/heading"];

  if (selectedBlock && permittedBlock.includes(selectedBlock.name) === false) {
    return null;
  }

  const onToggle = () => {
    // Apply the first format
    let nextValue = toggleFormat(value, {
      type: WORD_SWITCH_FORMAT_TYPE_WRAP,
    });
    // Apply the second format to the result of the first
    nextValue = toggleFormat(nextValue, {
      type: WORD_SWITCH_FORMAT_TYPE,
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
