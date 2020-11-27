import 'tinymce/icons/default/icons';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/table';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/imagetools';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/print';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/code';
import 'tinymce/plugins/contextmenu';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/media';
import 'tinymce/plugins/table';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/code';
import 'tinymce/plugins/help';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/directionality';
import './additional_plugins/latex';
import 'tinymce/skins/ui/oxide/skin.min.css';

let config = {
  height: 300,
  width: '100%',
  branding: false,
  theme_url: process.env.PUBLIC_URL + '/tinymce/themes/silver/theme.js',
  directionality: 'rtl',
  extended_valid_elements:
    'svg[*],defs[*],pattern[*],desc[*],metadata[*],g[*],mask[*],path[*],line[*],marker[*],rect[*],circle[*],ellipse[*],polygon[*],polyline[*],linearGradient[*],radialGradient[*],stop[*],image[*],view[*],text[*],textPath[*],title[*],tspan[*],glyph[*],symbol[*],switch[*],use[*]',
  content_css:
    '/fonts/iranyekan/iranyekan.css, https://fonts.googleapis.com/css?family=Almarai|Baloo+Bhaijaan|Changa|El+Messiri|Harmattan|Lalezar|Markazi+Text&display=swap',
  font_formats:
    'Almarai=almarai,sans-serif;' +
    'Andale Mono=andale mono,times;' +
    'Arial=arial,helvetica,sans-serif;' +
    'Arial Black=arial black,avant garde;' +
    'Baloo Bhaijaan=Baloo Bhaijaan, cursive;' +
    'Book Antiqua=book antiqua,palatino;' +
    'Changa=Changa, sans-serif;' +
    'Comic Sans MS=comic sans ms,sans-serif;' +
    'Courier New=courier new,courier;' +
    'Century Gothic=century_gothic;' +
    'El Messiri=El Messiri, sans-serif;' +
    'Georgia=georgia,palatino;' +
    'Gill Sans MT=gill_sans_mt;' +
    'Gill Sans MT Bold=gill_sans_mt_bold;' +
    'Gill Sans MT BoldItalic=gill_sans_mt_bold_italic;' +
    'Gill Sans MT Italic=gill_sans_mt_italic;' +
    'Harmattan=Harmattan, sans-serif;' +
    'Helvetica=helvetica;' +
    'iranyekan=iranyekan, sans-serif;' +
    'IRANSans=IRANSans-web, sans-serif;' +
    'Impact=impact,chicago;' +
    'Iskola Pota=iskoola_pota;' +
    'Iskola Pota Bold=iskoola_pota_bold;' +
    'Lalezar=Lalezar, cursive;' +
    'Markazi Text=Markazi Text, serif;' +
    'Symbol=symbol;' +
    'Tahoma=tahoma,arial,helvetica,sans-serif;' +
    'Terminal=terminal,monaco;' +
    'Times New Roman=times new roman,times;' +
    'Trebuchet MS=trebuchet ms,geneva;' +
    'Verdana=verdana,geneva;' +
    'Webdings=webdings;' +
    'Wingdings=wingdings,zapf dingbats;',
  plugins: [
    'advlist autolink lists link image imagetools charmap print preview anchor',
    'searchreplace visualblocks code fullscreen latex contextmenu',
    'insertdatetime media table paste code help wordcount directionality',
  ],
  toolbar:
    'undo redo | styleselect | formatgroup | bullist numlist align paragraphgroup | latex link image emoticons table | charmap hr | ',
  toolbar_groups: {
    formatgroup: {
      icon: 'format',
      tooltip: 'Formatting',
      items:
        'bold italic underline strikethrough | forecolor backcolor | superscript subscript | removeformat',
    },
    paragraphgroup: {
      icon: 'paragraph',
      tooltip: 'حالت پاراگراف',
      items: 'rtl ltr | indent outdent',
    },
    mobile_paragraphgroup: {
      icon: 'paragraph',
      tooltip: 'حالت پاراگراف',
      items:
        'bullist numlist | alignleft aligncenter alignright | rtl ltr | indent outdent',
    },
    insertgroup: {
      icon: 'plus',
      tooltip: 'درج',
      items: 'link image emoticons table charmap hr',
    },
  },
  contextmenu:
    'link image imagetools table latex spellchecker | bold italic underline strikethrough | forecolor backcolor | removeformat',
  menubar: false,
  mobile: {
    toolbar_groups: {
      formatgroup: {
        icon: 'format',
        tooltip: 'Formatting',
        items:
          'bold italic underline strikethrough | forecolor backcolor | superscript subscript | removeformat',
      },
      mobile_paragraphgroup: {
        icon: 'paragraph',
        tooltip: 'حالت پاراگراف',
        items:
          'bullist numlist | alignleft aligncenter alignright | rtl ltr | indent outdent',
      },
    },
    menubar: false,
    toolbar:
      'undo redo | styleselect | formatgroup mobile_paragraphgroup | latex link image emoticons table | charmap hr | ',
  },
};

export default config;
