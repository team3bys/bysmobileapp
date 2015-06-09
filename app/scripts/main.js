require.config({
	paths: {
		jquery: 'libs/jquery',
		jqueryMobile: 'libs/jquery.mobile-1.3.2'
	},
  shim: {
	"libs/jquery.mobile-1.3.2'" : { deps: ["jquery"], exports: 'jquery' },
  }
});

require(["jquery",
	"jqueryMobile",
], function ($) {
  console.log('jQuery version ' + $().jquery + ' installed');

  $(document).on("pageinit", "#index", function() {

    var xmlResponse = $.ajax({
      url: "http://askbys.com/feed",
      dataType: "xml",
      crossDomain: true,
    });
    var parsedXml = $.parseXml(xmlResponse);
    var xmlObject = $(parsedXml);

    if (xmlObject) {
      console.log(xmlObject.text());
    }

    $("#search").on("listviewbeforefilter", function (e, data) {
      var $ul = $(this),
      $input = $(data.input),
      input = $input.val(),
      html = "";
      $ul.html(html);
      if (input && input.length > 2) {
        $ul.html("<li><div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div></li>");
        $ul.listview("refresh");
        $.ajax({
          url: "http://askbys.com/feed",
          dataType: "xml",
          crossDomain: true,
        }).then(function (response) {

          if (response) {

            $("item", response).each(function (entry) {

              alert($("category", entry).contents().filter(function() {
                return this.nodeType == Node.TEXT_NODE;
              }).each(function() {
                $(this).text();
              }));

            });

          } else {
            html = "<h4>Sorry, we were unable to contact the server.</h4>";
          }
          $ul.html(html);
          $ul.listview("refresh");
          $ul.trigger("updatelayout");
        });
      }
    });
  });
});
