'use strict';

var dashing = dashing || angular.module('dashing', []);

dashing.controller('EventCtrl', ['$scope',
  $scope => {
    const source = new EventSource('/events');

    source.addEventListener('message', message => {
      const data = JSON.parse(message.data);
      if (angular.isObject(data)) {
        $scope.$apply(() => {
          $scope.$broadcast(data.id, data);
        });
      }
    }, false);
  },
]);

dashing.gridsterLayout = positions => {
  dashing.customGridsterLayout = true;
  positions = positions.replace(/^"|"$/g, '');
  positions = $.parseJSON(positions);
  const widgets = $('[data-row^=]');
  for (let index = 0, len = widgets.length; index < len; ++index) {
    const widget = widgets[index];
    $(widget).attr('data-row', positions[index].row);
    $(widget).attr('data-col', positions[index].col);
  }
};

dashing.getWidgetPositions = () => {
  $('.gridster ul:first').gridster().data('gridster').serialize();
};

dashing.showGridsterInstructions = () => {
  const newWidgetPositions = dashing.getWidgetPositions();

  if (JSON.stringify(newWidgetPositions) !==
      JSON.stringify(dashing.currentWidgetPositions)) {
    dashing.currentWidgetPositions = newWidgetPositions;
    // $('#save-gridster').slideDown();
    // $('#gridster-code').text('<script type=\'text/javascript\'>\n' +
    //   '$(function() {\n' +
    //   '  dashing.gridsterLayout(' +
    //   "'#{JSON.stringify(dashing.currentWidgetPositions)}'" +
    //   ')\n});\n' +
    //   ' </script>');
  }
};

$(() => { // DOM Ready
  /* eslint-disable camelcase */
  dashing.widget_margins = [5, 5];
  dashing.widget_base_dimensions = [
  /* eslint-enable camelcase */
    (dimensions[0] - 60) / 4,
    (dimensions[1] - 30) / 2,
  ];
  dashing.numColumns = 4;

  const contentWidth = (dashing.widget_base_dimensions[0] +
    dashing.widget_margins[0] * 2) * dashing.numColumns;

  $('.gridster').width(contentWidth);
  $('.gridster ul:first').gridster({
    /* eslint-disable camelcase */
    widget_margins: dashing.widget_margins,
    widget_base_dimensions: dashing.widget_base_dimensions,
    avoid_overlapped_widgets: !dashing.customGridsterLayout,
    min_rows: 3,
    /* eslint-enable camelcase */
    draggable: {
      stop: dashing.showGridsterInstructions,
      start() {
        dashing.currentWidgetPositions = dashing.getWidgetPositions();
      },
    },
  });
});
