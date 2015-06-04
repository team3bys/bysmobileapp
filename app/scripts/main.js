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
    $("#search").on("listviewbeforefilter", function (e, data) {
      var $ul = $(this),
      $input = $(data.input),
      value = $input.val(),
      html = "";
      $ul.html(html);
      if (value && value.length > 2) {
        $ul.html("<li><div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div></li>");
        $ul.listview("refresh");
        $.ajax({
          url: "http://gd.geobytes.com/AutoCompleteCity",
          dataType: "jsonp",
          crossDomain: true,
          data: {
            q: $input.val()
          }
        })
        .then(function (response) {
          $.each(response, function (i, val) {
            html += "<li>" + val + "</li>";
          });
          $ul.html(html);
          $ul.listview("refresh");
          $ul.trigger("updatelayout");
        });
      }
    });
  });
});
