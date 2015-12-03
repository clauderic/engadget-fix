(function() {
	if (window.location.href.indexOf('engadget.com/all/') !== -1) {
		// Parse all articles on the page
		$('main article').each(function(index, el) {
			var $el = $(el),
				$link = $el.find('.o-hit__link'),
				$img = $el.find('.o-rating_thumb img'),
				isFeatured = false,
				href;
	
			// If no link is found
			if (!$link.length) {
				// Check if the post is featured
				$link = $el.find('h2 a');
	
				if ($link.length) {
					isFeatured = true;
				}
			}
	
			// Hide the small thumbnail on desktop
			if ($img.length) {
				$img.closest('.grid\\@m\\+__cell').addClass('hide\@m\+ article__thumb').next().addClass('article__heading');
			}
	
			href = $link.attr('href');
	
			if (href) {
				// Get the post Excerpt and Cover Image
				$.ajax({
				   url:href,
				   type:'GET',
				   success: function(data){
				   		var $html = $(data),
				   			$parent = $(el).parent(),
				   			$first = $html.find('main article .o-article_block:first'),
				   			$img,
				   			$article;
	
				   		// If cover image
				   		if ($first.find('img').length) {
				   			$img = $first.find('img');
				   			$first = $first.next('.o-article_block');
				   		}
	
				   		// Find the first line of text (should probably make this cleaner... but life is too short)
				   		if ($first.find('.article-text').length) {
				   			$article = $first.find('.article-text:last');
				   		} else {
				   			$article = $first.next().find('.article-text:last');
				   		}
	
				   		if ($img && !isFeatured) {
				    		$img.appendTo($parent).addClass('article__img');
				    	}
	
				    	$article.appendTo($parent).addClass('article__excerpt');
				   }
				});
			}
		});
	
		// Style fixes
		var style = '';
		style += '<style type="text/css">';
		style += '.article__excerpt {';
		style += '	padding: 30px 90px;';
		style += '	margin-top: 20px;';
		style += '}';
		style += '.article__img {';
		style += '	padding: 20px;';
		style += '  margin: 20px 0;';
		style += '}';
		style += 'main .col-8-of-12\\@tl { width: 98% !important; } ';
		style += '.article__heading { width: 85% !important; } ';
		style += '</style>';
	
		$(style).appendTo( "head" );
	}
})();
