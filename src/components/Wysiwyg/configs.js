export const document = {
  documentReady: true,
  toolbarSticky: true,
  toolbarButtons: {
    moreText: {
      buttons: [
        'fontFamily',
        'fontSize',
        'textColor',
        'bold',
        'italic',
        'underline',
        'strikeThrough',
        'subscript',
        'superscript',
      ],
      buttonsVisible: 10,
    },
    moreParagraph: {
      buttons: [
        'alignLeft',
        'alignCenter',
        'alignRight',
        'alignJustify',
        'formatOL',
        'formatUL',
        'lineHeight',
        'outdent',
        'indent',
      ],
      buttonsVisible: 10,
    },
    moreRich: {
      buttons: ['insertLink', 'insertTable'],
      buttonsVisible: 3,
    },
    moreMisc: {
      buttons: ['undo', 'redo'],
      align: 'right',
      buttonsVisible: 2,
    },
  },
  toolbarButtonsXS: {
    moreText: {
      buttons: [
        'bold',
        'italic',
        'underline',
        'strikeThrough',
        'subscript',
        'superscript',
        'fontFamily',
        'fontSize',
        'textColor',
      ],
      buttonsVisible: 6,
    },
    moreParagraph: {
      buttons: [
        'alignLeft',
        'alignCenter',
        'formatOLSimple',
        'alignRight',
        'alignJustify',
        'formatOL',
        'formatUL',
        'lineHeight',
        'outdent',
        'indent',
      ],
      buttonsVisible: 5,
    },
    moreRich: {
      buttons: ['insertLink', 'insertTable'],
      buttonsVisible: 2,
    },
    moreMisc: {
      buttons: ['undo', 'redo'],
      align: 'right',
      buttonsVisible: 2,
    },
  },
};

export const field = {
  toolbarButtons: {
    moreText: {
      buttons: [
        'bold',
        'italic',
        'underline',
        'strikeThrough',
        'subscript',
        'superscript',
        'fontFamily',
        'fontSize',
        'textColor',
      ],
      buttonsVisible: 6,
    },
    moreParagraph: {
      buttons: [
        'alignLeft',
        'alignCenter',
        'alignRight',
        'alignJustify',
        'formatOL',
        'formatUL',
        'lineHeight',
        'outdent',
        'indent',
      ],
      buttonsVisible: 10,
    },
    moreRich: {
      buttons: ['insertLink', 'insertTable'],
      buttonsVisible: 3,
    },
    moreMisc: {
      buttons: ['undo', 'redo'],
      align: 'right',
      buttonsVisible: 2,
    },
  },
  toolbarButtonsXS: {
    moreText: {
      buttons: [
        'bold',
        'italic',
        'underline',
        'strikeThrough',
        'subscript',
        'superscript',
        'fontFamily',
        'fontSize',
        'textColor',
      ],
      buttonsVisible: 6,
    },
    moreParagraph: {
      buttons: [
        'alignLeft',
        'alignCenter',
        'alignRight',
        'alignJustify',
        'formatOL',
        'formatUL',
        'lineHeight',
        'outdent',
        'indent',
      ],
      buttonsVisible: 5,
    },
    moreRich: {
      buttons: ['insertLink', 'insertTable'],
      buttonsVisible: 2,
    },
    moreMisc: {
      buttons: ['undo', 'redo'],
      align: 'right',
      buttonsVisible: 2,
    },
  },
};

export const article = {
  placeholderText: 'Edit Your Content Here!',
  toolbarSticky: true,
  height: 400,
  toolbarButtons: {
    moreText: {
      buttons: [
        'bold',
        'italic',
        'underline',
        'strikeThrough',
        'subscript',
        'superscript',
        'fontFamily',
        'fontSize',
        'textColor',
        'backgroundColor',
        'clearFormatting',
      ],
      buttonsVisible: 3,
    },
    moreParagraph: {
      buttons: [
        'alignLeft',
        'alignCenter',
        'formatOLSimple',
        'alignRight',
        'alignJustify',
        'formatOL',
        'formatUL',
        'paragraphFormat',
        'paragraphStyle',
        'lineHeight',
        'outdent',
        'indent',
        'quote',
      ],
      buttonsVisible: 3,
    },
    moreRich: {
      buttons: [
        'insertLink',
        'insertTable',
        'emoticons',
        'specialCharacters',
        'insertHR',
        'Undo',
        'Redo',
      ],
      buttonsVisible: 3,
    },
    moreMisc: {
      buttons: [
        'undo',
        'redo',
        'fullscreen',
        'print',
        'getPDF',
        'spellChecker',
        'selectAll',
        'html',
        'help',
      ],
      align: 'right',
      buttonsVisible: 3,
    },
  },
  toolbarButtonsXS: {
    moreText: {
      buttons: [
        'bold',
        'italic',
        'underline',
        'strikeThrough',
        'subscript',
        'superscript',
        'fontFamily',
        'fontSize',
        'textColor',
        'backgroundColor',
        'clearFormatting',
      ],
      buttonsVisible: 3,
    },
    moreParagraph: {
      buttons: [
        'alignLeft',
        'alignCenter',
        'formatOLSimple',
        'alignRight',
        'alignJustify',
        'formatOL',
        'formatUL',
        'paragraphFormat',
        'paragraphStyle',
        'lineHeight',
        'outdent',
        'indent',
        'quote',
      ],
      buttonsVisible: 3,
    },
    moreRich: {
      buttons: [
        'insertLink',
        'insertTable',
        'emoticons',
        'specialCharacters',
        'insertHR',
        'Undo',
        'Redo',
      ],
      buttonsVisible: 3,
    },
    moreMisc: {
      buttons: [
        'undo',
        'redo',
        'fullscreen',
        'print',
        'getPDF',
        'spellChecker',
        'selectAll',
        'html',
        'help',
      ],
      align: 'right',
      buttonsVisible: 3,
    },
  },
};

export const product = {
  imageUpload: true,
  imagePaste: true,
  pastePlain: false,
  wordPasteModal: false,
  wordPasteKeepFormatting: true,
  imageMaxSize: 2 * 1024 * 1024, //2Mb
  events: {
    'image.beforeUpload': function (files) {
      var editor = this;
      if (files.length) {
        // Create a File Reader.
        var reader = new FileReader();
        // Set the reader to insert images when they are loaded.
        reader.onload = function (e) {
          var result = e.target.result;
          editor.image.insert(result, null, null, editor.image.get());
        };
        // Read image as base64.
        reader.readAsDataURL(files[0]);
      }
      editor.popups.hideAll();
      // Stop default upload chain.
      return false;
    },
  },
  documentReady: true,
  toolbarSticky: true,
  toolbarButtons: {
    moreText: {
      buttons: [
        'fontFamily',
        'fontSize',
        'textColor',
        'bold',
        'italic',
        'underline',
        'strikeThrough',
        'subscript',
        'superscript',
        'clearFormatting',
      ],
      buttonsVisible: 10,
    },
    moreParagraph: {
      buttons: [
        'alignLeft',
        'alignCenter',
        'alignRight',
        'alignJustify',
        'formatOL',
        'formatUL',
        'lineHeight',
        'outdent',
        'indent',
      ],
      buttonsVisible: 10,
    },
    moreRich: {
      buttons: ['insertLink', 'insertTable', 'insertImage'],
      buttonsVisible: 4,
    },
    moreMisc: {
      buttons: ['undo', 'redo'],
      align: 'right',
      buttonsVisible: 2,
    },
  },
  toolbarButtonsXS: {
    moreText: {
      buttons: [
        'bold',
        'italic',
        'underline',
        'strikeThrough',
        'subscript',
        'superscript',
        'fontFamily',
        'fontSize',
        'textColor',
      ],
      buttonsVisible: 6,
    },
    moreParagraph: {
      buttons: [
        'alignLeft',
        'alignCenter',
        'formatOLSimple',
        'alignRight',
        'alignJustify',
        'formatOL',
        'formatUL',
        'lineHeight',
        'outdent',
        'indent',
      ],
      buttonsVisible: 5,
    },
    moreRich: {
      buttons: ['insertLink', 'insertTable', 'insertImage'],
      buttonsVisible: 3,
    },
    moreMisc: {
      buttons: ['undo', 'redo'],
      align: 'right',
      buttonsVisible: 2,
    },
  },
};
