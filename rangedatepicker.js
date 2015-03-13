$.widget("ui.rangedatepicker", {
   options: {
      rangeSelection: null,
      beginSelection: null,
      endSelection: null,
      ranges: []
   },

   _init: function () {
      var $el = this.element;
      $el.datepicker(this.options);
      this._generateHTML();
   },

   _getNameIfInRange: function (dateTime) {
      if (!this.options.ranges) {
         return "";
      }
      var element;
      for (var i = 0; i < this.options.ranges.length; i++) {
         element = this.options.ranges[i];
         if (dateTime === element.begin.getTime()) {
            return " begin-" + element.type + " ";
         }
         else if (dateTime < element.end.getTime() && dateTime > element.begin.getTime()) {
            return " " + element.type + " ";
         }
         else if (dateTime === element.end.getTime()) {
            return " end-" + element.type + " ";
         }
      }
      return "";
   },

   _isInSelectedRange: function (inst, dateTime) {
      if (!inst.settings.beginSelection || !inst.settings.endSelection) {
         return "";
      }
      if (dateTime >= new Date(inst.settings.beginSelection).getTime() &&
         dateTime <= new Date(inst.settings.endSelection).getTime()) {
         return " ui-state-hovered ";
      }
      else {
         return "";
      }
   },

   _addRangeDatepicker: function (target, dateD, dateF, type) {
      var inst = this._getInst(target);
      inst.settings.ranges.push({
         begin: new Date(dateD),
         end: new Date(dateF),
         type: type
      });
      this._updateDatepicker(inst);
   },

   _generateHTML: function () {
      var day, month, year, date, $a;
      var html = this.element;
      var that = this;
      $(html).find('a[class*="ui-state"]').each(function (index, element) {
         $a = $(element);
         day = $a.text();
         month = $a.parent().attr('data-month');
         year = $a.parent().attr('data-year');
         date = new Date((+month + 1) + '/' + day + '/' + year);
         $a.addClass(that._getNameIfInRange(date.getTime()));
         $a.bind('click', function () {
            that._generateHTML();
            return false;
         });
      });
   }
});