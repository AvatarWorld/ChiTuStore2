define(["require", "exports", 'Application'], function (require, exports, app) {
    "use strict";
    var $loadingForm = $('#loadingForm');
    function on_shown() {
        if (window['bootbox'])
            window['bootbox'].hideAll();
        $loadingForm.hide();
        $('#main').show();
    }
    app.pageCreated.add(function (sender, page) {
        page.container.showing.add(on_shown);
    });
    if (app.currentPage() != null) {
        app.currentPage().container.shown.add(on_shown);
        if (app.currentPage().visible == true) {
            on_shown();
        }
    }
});
