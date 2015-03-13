var datepicker = angular.module('TestModule', []);

datepicker.controller('TestCtrl', function () {
   this.ranges = [{
      begin: new Date('03/20/2015'),
      end: new Date('03/23/2015'),
      type: 'presentation'
   }];

   this.show = function () {
      console.log(this.from);
   };
});

datepicker.directive('datepicker', function () {
   return {
      templateUrl: 'datepicker-template.html',
      restrict: 'E',
      scope: {
         from: '=',
         to: '='
      },
      link: function (scope, element, attr) {
         var from = element.find('#from');
         var to = element.find('#to');
         from.datepicker({
            defaultDate: '+1w',
            numberOfMonths: +attr.numberOfMonth || 1,
            rangeSelection: 'from',
            minDate: 0,
            onClose: function (selectedDate) {
               scope.from = selectedDate;
               to.datepicker('option', 'minDate', selectedDate);
               to.datepicker('option', 'beginSelection', selectedDate);
               scope.$apply();
            }
         });

         to.datepicker({
            defaultDate: '+1w',
            numberOfMonths: +attr.numberOfMonth || 1,
            rangeSelection: 'to',
            onClose: function (selectedDate) {
               scope.to = selectedDate;
               from.datepicker('option', 'maxDate', selectedDate);
               from.datepicker('option', 'endSelection', selectedDate);
               scope.$apply();
            }
         });
      }
   };
});

datepicker.directive('calendar', function () {
   return {
      templateUrl: 'calendar-template.html',
      restrict: 'E',
      scope: {
         ranges: '='
      },
      link: function (scope, element, attr) {
         console.log(attr);
         var calendar = element.find('#calendar');
         var from = element.find('#from');
         var to = element.find('#to');

         element.find('#reserv').click(function () {
            var begin = from.datepicker('getDate');
            var end = to.datepicker('getDate');
            var range = {
               begin: begin,
               end: end,
               type: 'reservation'
            };
            calendar.datepicker('addRange', range);
         });

         from.datepicker({
            defaultDate: '+1w',
            numberOfMonths: +attr.numberOfMonth || 1,
            rangeSelection: 'from',
            minDate: 0,
            onClose: function (selectedDate) {
               to.datepicker('option', 'minDate', selectedDate);
               to.datepicker('option', 'beginSelection', selectedDate);
            }
         });

         to.datepicker({
            defaultDate: '+1w',
            numberOfMonths: +attr.numberOfMonth || 1,
            rangeSelection: 'to',
            onClose: function (selectedDate) {
               from.datepicker('option', 'maxDate', selectedDate);
               from.datepicker('option', 'endSelection', selectedDate);
            }
         });

         calendar.datepicker({
            numberOfMonths: 1,
            ranges: scope.ranges
         });
      }
   };
});