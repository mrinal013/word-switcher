import { toggleFormat, registerFormatType } from "@wordpress/rich-text";
import { RichTextToolbarButton } from "@wordpress/block-editor";

const WORD_SWITCH_FORMAT_TYPE = "word-switch/format-type-delimiter";

registerFormatType(WORD_SWITCH_FORMAT_TYPE, {
  title: "Word Switch",
  tagName: "span",
  className: "word-switch",
  edit: ({ isActive, onChange, value }) => {
    return (
      <RichTextToolbarButton
        icon="update"
        title="Mark as Word Switcher Area"
        onClick={() => {
          onChange(
            toggleFormat(value, {
              type: WORD_SWITCH_FORMAT_TYPE,
            })
          );
        }}
        isActive={isActive}
      />
    );
  },
});
