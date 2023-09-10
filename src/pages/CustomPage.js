import React from 'react';

const CustomPage = () => {

  (function () { var responsiveStartStr = '<style>.porsline_embed{}.porsline_embed .ratio {display:block;width:100%;height:auto;}.porsline_embed iframe {position:absolute;top:0;left:0;width:100%; height:100%;}</style>'; responsiveStartStr += '<div class="porsline_embed"> <span style="display: block;padding-top: 44.3%"></span>'; var responsiveEndStr = '</div>'; var newiframe = document.createElement('iframe'); newiframe.setAttribute('src', 'https://survey.porsline.ir/s/ZCPTCmUV/'); newiframe.setAttribute('border', 'none'); newiframe.setAttribute('height', '100%'); newiframe.setAttribute('width', '100%'); newiframe.setAttribute('style', 'min-height: 420px;min-width: 360px;max-height: 100%;max-width: 100%;'); newiframe.setAttribute('frameborder', '0'); setTimeout(function () { document.getElementById('ZCPTCmUV').innerHTML = responsiveStartStr + responsiveEndStr; document.getElementById('ZCPTCmUV').getElementsByClassName('porsline_embed')[0].appendChild(newiframe); }, 200); })();
  return (
    <>
      <div id="ZCPTCmUV" style={{ minHeight: '480px' }} >
      </div>
    </>
  );
};

export default CustomPage;
