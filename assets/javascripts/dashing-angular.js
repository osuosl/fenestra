var dashing = dashing || angular.module('dashing', []);

dashing.controller('EventCtrl', ['$scope',
  function ($scope) {
    'use strict';
    var source = new EventSource('/events');

    source.addEventListener('message', function (message) {
      var data = JSON.parse(message.data);
      if (angular.isObject(data)) {
        $scope.$apply(function () {
          $scope.$broadcast(data.id, data);
        });
      }
    }, false);
  }
]);

dashing.gridsterLayout = function(positions) {
  dashing.customGridsterLayout = true;
  positions = positions.replace(/^"|"$/g, '');
  positions = $.parseJSON(positions);
  widgets = $("[data-row^=]");
  for (var index = 0, len = widgets.length; index < len; ++index) {
    $(widget).attr('data-row', positions[index].row);
    $(widget).attr('data-col', positions[index].col);
  }
}

dashing.getWidgetPositions = function() {
  $(".gridster ul:first").gridster().data('gridster').serialize();
}

dashing.showGridsterInstructions = function() {
  newWidgetPositions = dashing.getWidgetPositions()

  if (JSON.stringify(newWidgetPositions) !== JSON.stringify(dashing.currentWidgetPositions)) {
    dashing.currentWidgetPositions = newWidgetPositions;
    // $('#save-gridster').slideDown()
    // $('#gridster-code').text("
    //   <script type='text/javascript'>\n
    //   $(function() {\n
    //   \ \ dashing.gridsterLayout('#{JSON.stringify(dashing.currentWidgetPositions)}')\n
    //   });\n
    //   </script>
    // ")
  }
}

$(function(){ //DOM Ready
  dashing.widget_margins = [5, 5];
  dashing.widget_base_dimensions = [300, 360];
  dashing.numColumns = 4;

  contentWidth = (dashing.widget_base_dimensions[0] + dashing.widget_margins[0] * 2) * dashing.numColumns

  $('.gridster').width(contentWidth);
  $(".gridster ul:first").gridster({
    widget_margins: dashing.widget_margins,
    widget_base_dimensions: dashing.widget_base_dimensions,
    avoid_overlapped_widgets: !dashing.customGridsterLayout,
    min_rows: 3,
    draggable: {
      stop: dashing.showGridsterInstructions,
      start: function() { dashing.currentWidgetPositions = dashing.getWidgetPositions() }
    }
  });
});