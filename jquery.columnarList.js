/*!
 * columnarList jQuery Plugin
 * Inspired by the 'columnizeList' plugin: http://christianyates.com/blog/mmm-geeky/multi-column-lists-jquery-alternative-method
 * Copyright (c) 2011 Andy Ford (http://fordinteractive.com)
 * Version: 0.9 (2011-10-23)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Requires: jQuery v1.3.2 or later
 */
(function ($) {
    $.fn.columnarList = function (opts) {
        opts = $.extend({
            clearfix : false,
            colClass : 'list-col',
            colClassLast : 'list-col-last',
            cols : 4,
            colStyle : {
                'float' : 'left',
                'list-style' : 'none',
                'margin' : 0,
                'padding' : 0
            },
            equalHeight : false,
            equalWidth : false
        }, opts);
        if (this.length === 0) {
            return;
        }
        return this.each(function () {
            var container = $(this),
                containerElem = container[0].tagName.toLowerCase(),
                colWidth = Math.floor(container.width() / opts.cols),
                colHeight = 0,
                itemsPerCol = Math.ceil($('li', container).size() / opts.cols),
                prevCol = -1;
            $('li', $(this)).each(function (idx) {
                var currCol = Math.floor(idx / itemsPerCol),
                    newCol;
                if (prevCol !== currCol) {
                    newCol = $('<li class="' + opts.colClass + '"/>');
                    newCol.css(opts.colStyle).append($('<' + containerElem + '/>'));
                    container.append(newCol);
                }
                $(this).attr('value', (idx + 1)).appendTo($(this).parent().find('.' + opts.colClass).eq(currCol).find('> ' + containerElem));
                prevCol = currCol;
            });
            container.find('.' + opts.colClass + ':last-child').addClass(opts.colClassLast);
            if (opts.equalWidth) {
                container.find('.' + opts.colClass).css({'width': colWidth + 'px'});
            }
            if (opts.equalHeight) {
                container.find(containerElem).each(function () {
                    if ($(this).height() > colHeight) {
                        colHeight = $(this).height();
                    }
                }).css({'min-height' : colHeight + 'px'});
            }
            if (opts.clearfix) {
                container.after('<div style="clear:both;"></div>');
            }
        });
    };
}(jQuery));