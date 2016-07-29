(function($) {
    $.fn.wordVender = function(args) {
        if (this.length == 0) {
            return;
        }
        var option = {
            fontSize: '20px',
            words: [],
            speed: 100,
            pNumber: 0,
            pflag: 0,
            wordFlag: 0,
            wordArrayFlag: 0
        };
        var container = $(this);

        var options = $.extend(option, args);

        init();

        function init() {
            options.height = getNumberByCss('height');
            options.width = getNumberByCss('width');

            options.fontSize = parseInt(options.fontSize.split('px')[0]);
            options.height = parseInt(options.height / (options.fontSize + 8));
            options.width = parseInt(options.width / (options.fontSize + 8));
            options.pNumber = 0;
            for (var i = options.words.length - 1; i >= 0; i--) {

                options.pNumber += parseInt(options.words[i].length / options.height);
                options.pNumber += !(options.words[i].length % options.height) ? 0 : 1;
            }

            createWordP();

            options.timeout = setInterval(function() {
                renderWord();
            }, options.speed);
        }

        function getNumberByCss(css, el) {
            el = el || container;
            return parseInt($(el).css(css).split('px')[0]);
        }

        function createWordP() {
            var pItem = '<p class="wordVender-p"></p>';
            var right = 0;

            for (var i = options.pNumber; i > 0; i--) {
                $(pItem).appendTo(container).css({
                    'margin': '0',
                    'padding': '0 4px',
                    'font-size': options.fontSize + 'px',
                    'line-height': (options.fontSize + 8) + 'px',
                    'float': 'right',
                    'width': options.fontSize + 'px',
                    'word-break': 'break-word',
                    'word-wrap': 'break-word',
                    'text-align': 'center',
                    'position': 'absolute',
                    'right': right + 'px',
                    'top': '0px'
                });
                right += (options.fontSize + 8);
            }
        }

        function renderWord() {
            if (options.wordFlag % options.height == 0 && options.wordFlag != 0) {
                options.pflag++;
            }

            if (options.wordArrayFlag == options.words.length) {
                options.timeout && (function() {
                    clearInterval(options.timeout);
                    options.timeout = null;
                }());
                options.timeMoveRight && (function() {
                    clearInterval(options.timeMoveRight);
                    options.timeMoveRight = null;
                }());

                return;
            }

            if (options.words[options.wordArrayFlag].length <= options.wordFlag && options.wordArrayFlag < options.words.length) {
                options.pflag++;
                options.wordArrayFlag++;
                options.wordFlag = 0;
            }

            if (options.wordArrayFlag == options.words.length) {
                options.timeout && (function() {
                    clearInterval(options.timeout);
                    options.timeout = null;
                }());
                options.timeMoveRight && (function() {
                    clearInterval(options.timeMoveRight);
                    options.timeMoveRight = null;
                }());
                return;
            }

            (options.pflag + 6) > options.width && (!options.timeMoveRight) && (function() {
                options.timeMoveRight = setInterval(function() { moveRight() }, (options.speed * options.height) / (1 * (options.fontSize + 8)))
            }());

            var text = $('.wordVender-p').eq(options.pflag).text();
            text += options.words[options.wordArrayFlag][options.wordFlag];
            $('.wordVender-p').eq(options.pflag).text(text);
            options.wordFlag++;

        }

        function moveRight() {
            var len = $('.wordVender-p').length,
                right;
            for (var i = 0; i < len; i++) {
                right = parseInt($('.wordVender-p').eq(i).css('right').split('px')[0]);
                right -= 1;
                $('.wordVender-p').eq(i).css('right', right + 'px');
            }
        }

    }
})(jQuery)
