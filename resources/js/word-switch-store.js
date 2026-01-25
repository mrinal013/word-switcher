import { store, getContext } from "@wordpress/interactivity";

store("wpdevagent/word-switch", {
  state: {
    get currentWord() {
      const context = getContext();
      // const firstEndPos = context.words[context.currentIndex].indexOf(">");
      // const firstEnd = context.words[context.currentIndex].slice(
      //   firstEndPos + 1,
      // );
      // const middleEndPos = firstEnd.indexOf("</");
      // return firstEnd.slice(middleEndPos);
      return context.words[context.currentIndex];
    },
  },
  callbacks: {
    init() {
      const context = getContext();

      setInterval(() => {
        context.isFading = true;
        setTimeout(() => {
          context.isFading = false;
          context.currentIndex =
            (context.currentIndex + 1) % context.words.length;
        }, 500);
      }, 5000);
    },
  },
});
