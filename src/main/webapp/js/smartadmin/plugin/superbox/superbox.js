/*
	SuperBox v1.0.0 (modified by bootstraphunter.com)
	by Todd Motto: http://www.toddmotto.com
	Latest version: https://github.com/toddmotto/superbox
	
	Copyright 2013 Todd Motto
	Licensed under the MIT license
	http://www.opensource.org/licenses/mit-license.php

	SuperBox, the lightbox reimagined. Fully responsive HTML5 image galleries.
*/
;(function($) {
		
	$.fn.SuperBox = function(options) {
		
		var superbox      = $('<div class="superbox-show"></div>'),
			superboximg   = $('<img src="" class="superbox-current-img"><div id="imgInfoBox" class="superbox-imageinfo inline-block"> <h1></h1><span><p><em></em></p><p> <a href="javascript:void(0);" class="btn btn-danger btn-sm">Borrar</a></p></span> </div>'),
			superboxclose = $('<div class="superbox-close txt-color-white"><i class="fa fa-times fa-lg"></i></div>');
		
		superbox.append(superboximg).append(superboxclose);
		
		return this.each(function() {
			
			$('.superbox-list').click(function() {
				
				$this = $(this);
		
				var currentimg = $this.find('.superbox-img'),
					imgData = currentimg.data('img'),
					imgId = currentimg.data('id'),
					imgRef = currentimg.data('ref'),
					imgTitle = currentimg.attr('title') || "No Title";
					
				superboximg.attr('src', imgData);
				
				$('.superbox-list').removeClass('active');
				$this.addClass('active');
				
				superboximg.find('a').attr('href', imgId);
				superboximg.find('em').text(imgRef);
				superboximg.find('>:first-child').text(imgTitle);
				
				if($('.superbox-current-img').css('opacity') == 0) {
					$('.superbox-current-img').animate({opacity: 1});
				}
				
				if ($(this).next().hasClass('superbox-show')) {
					$('.superbox-list').removeClass('active');
					superbox.toggle();
				}
				else {
					superbox.insertAfter(this).css('display', 'block');
					$this.addClass('active');
				}
				
				$('html, body').animate({
					scrollTop:superbox.position().top - currentimg.width()
				}, 'medium');
			
			});
						
			$('.superbox').on('click', '.superbox-close', function() {
				$('.superbox-list').removeClass('active');
				$('.superbox-current-img').animate({opacity: 0}, 200, function() {
					$('.superbox-show').slideUp();
				});
			});
			
		});
	};
	
})(jQuery);