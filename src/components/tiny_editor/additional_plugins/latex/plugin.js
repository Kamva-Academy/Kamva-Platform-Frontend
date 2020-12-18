/* global tinymce */
import mathTextToSvg from '../mathTextToSvg';

(function () {
  const global = tinymce.util.Tools.resolve('tinymce.PluginManager');

  const open = function (editor, initData = '') {
    let latexData = initData;
    let svgLatex = mathTextToSvg(latexData);
    editor.windowManager.open({
      title: 'ویراستار فرمول ریاضی',
      body: {
        type: 'panel',
        items: [
          {
            type: 'htmlpanel',
            name: 'header',
            html:
              '<div style="text-align: right; direction: rtl">فرمول LaTeX موردنظر را در این کادر وارد کنید. (<a target="_blank" href="http://www.hostmath.com/">راهنما</a>)</div>',
          },
          {
            type: 'textarea',
            name: 'latex',
            inputMode: 'text',
            placeholder: '\\sum',
            maximized: true,
          },
          {
            type: 'htmlpanel',
            html:
              '<p style="text-align: right; direction: rtl">پیش‌نمایش:</p><div style="padding:20px; height: 50px"><p style="font-size: 14px!important; text-align: center;" class="latex-plugin-preview">' +
              svgLatex.outerHTML +
              '</p>',
          },
        ],
      },
      buttons: [
        {
          type: 'cancel',
          name: 'cancel',
          text: 'لغو',
        },
        {
          type: 'submit',
          name: 'save',
          text: 'ثبت',
          primary: true,
        },
      ],
      initialData: {
        latex: latexData,
      },
      onSubmit: (api) => {
        editor.execCommand(
          'mceInsertContent',
          false,
          svgLatex.outerHTML + '&nbsp;'
        );
        api.close();
      },
      onChange: (api) => updateSvg(api.getData().latex),
    });
    const updateSvg = (latex) => {
      latexData = latex;
      svgLatex = mathTextToSvg(latexData);
      document.querySelector('.latex-plugin-preview').innerHTML =
        svgLatex.outerHTML;
    };
  };

  const register = (editor) => {
    editor.addCommand('latexEditor', function () {
      open(editor);
    });
  };

  const register$1 = (editor) => {
    editor.ui.registry.addIcon(
      'latex',
      '<svg width="24px"  height="24px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g>	<g>		<path d="M263.507,62.967C265.179,51.833,272.833,40,283.729,40c11.028,0,20,8.972,20,20h40c0-33.084-26.916-60-60-60			c-33.629,0-55.527,28.691-59.784,57.073L211.083,144h-61.354v40h55.436l-39.22,265.073l-0.116,0.937			c-1.063,10.62-9.393,21.99-20.1,21.99c-11.028,0-20-8.972-20-20h-40c0,33.084,26.916,60,60,60			c33.661,0,56.771-29.141,59.848-57.496L245.6,184h60.129v-40h-54.211L263.507,62.967z"/>	</g></g><g>	<g>		<polygon points="426.271,248 378.236,248 352.249,287.085 334.923,248 291.17,248 325.997,326.569 270.523,410 318.558,410 			345.21,369.915 362.979,410 406.732,410 371.462,330.431 		"/>	</g></g></svg>'
    );
    editor.ui.registry.addButton('latex', {
      icon: 'latex',
      tooltip: 'latex editor',
      onAction: function () {
        return open(editor);
      },
    });
    editor.ui.registry.addMenuItem('latex', {
      icon: 'latex',
      text: 'latex editor',
      onAction: function () {
        return open(editor);
      },
    });
    editor.on('DblClick', function (e) {
      let mathTarget = e.target;
      if (e.target.className !== 'tiny-math') {
        mathTarget = e.target.closest('span.tiny-math');
        if (!mathTarget) return;
      }
      open(editor, mathTarget.dataset.latex);
    });
  };

  const Plugin = () => {
    global.add('latex', function (editor) {
      register(editor);
      register$1(editor);
      return {};
    });
  };

  Plugin();
})();
