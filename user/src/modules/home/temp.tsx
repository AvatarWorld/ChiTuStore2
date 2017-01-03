import { Page } from 'site';

export default function (page: Page) {
    page.loadingView.style.display = 'none';
    page.dataView.innerHTML = `
    <div class="norecords">
        <div class="icon">
            <i class="icon-rss">

            </i>
        </div>
        <h4 class="text">连接服务器错误</h4>
        <button data-bind="click:redirec" class="btn btn-default" style="margin-top:10px;">点击重新连接</button>
    </div>
    `;

}