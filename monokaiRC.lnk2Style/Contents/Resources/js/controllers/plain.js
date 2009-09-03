//
//  index.js
//  I Are Sea!
//
//  Created by Nicholas Penree on 4/21/09.
//  Copyright 2009 Conceited Software. All rights reserved.
//

// DECLARE GLOBAL VARIBLES
var fontSize;
var topicIsExpanded = false;
var domReady = false;
var spotlightUserMessagesOnHoverEnabled;
var canAppendMessage = true;
var lastTimestamp;

document.onready = function(e){
	domReady = true;
}

document.onclick = function(e){
	window.linkinus.focus();
}

function setVariant(name){
    if (name.toLowerCase() != 'standard'); {
    	
	    var href = 'css/' + ( name.toLowerCase() ) + '.css',
	      html = '<link id="variant" rel="stylesheet" href="' + href
	        + '" type="text/css" media="screen" charset="utf-8" />',
	      elem;
	    
	    if ( domReady ) {
	      elem = $('#variant');
	      elem.length ? elem.attr( 'href', href ) : $('head').append( html );
	    } else {
	      document.write( html );
	    }
    }
}

function setFontSize(size){
    $('body').css('font-size', size + 'px');
    $('p').css('font-size', size + 'px');
}

function setSpotlightUserMessagesOnHoverEnabled(enabled){
    spotlightUserMessagesOnHoverEnabled = enabled;
    
    return spotlightUserMessagesOnHoverEnabled;
}

function appendMessage(messageDetails) {

	if (!canAppendMessage) 
		return;
		
    var output = '';
    var test = '';
    var isHighlighted = false;
    lastTimestamp = messageDetails[TIMESTAMP_KEY];
    
	if(messageDetails[HIGHLIGHTED_KEY] == 1) {
		isHighlighted = true;
	}
				
	switch(messageDetails[MESSAGE_TYPE_KEY]) {
	    case 'msgMessage':
	    
	   	    if (messageDetails[MESSAGE_DIRECTION_KEY] == 1) {
				test ='<span style="font-weight:bold">$nickname</span>';
			} else {				
				if (type == 'query') {
					document.getElementById('topicText').innerText = messageDetails[USERHOST_KEY];
					test ='<span style="color:#E13426;font-weight:bold">$nickname</span>';
				} else {
					test ='$nickname';
				}
				
				if(messageDetails[HIGHLIGHTED_KEY] == 1) {
					test ='<span style="color:#E1D127;font-weight:bold">$nickname</span>';
				}
			}
	        output = '<span class="timestamp">$time</span> <span style="color:#FFFFFF;font-weight:bold">&lt;</span><span style="color:#8ee91f; font-weight: bold;">' + test + '</span><span style="color:#FFFFFF;font-weight:bold">&gt;</span> $description';
    	    break;
	    case 'msgAction':
	   	    if (messageDetails[MESSAGE_DIRECTION_KEY] == 1) {
				test ='<span style="font-weight:bold">$nickname</span>';
			} else {				
				if (type == 'query') {
					document.getElementById('topicText').innerText = messageDetails[USERHOST_KEY];
					test ='<span style="color:#E13426;font-weight:bold">$nickname</span>';
				} else {
					test ='<span style="font-weight:bold">$nickname</span>';
				}
				
				if(messageDetails[HIGHLIGHTED_KEY] == 1) {
					test ='<span style="color:#E1D127;font-weight:bold">$nickname</span>';
				}
			}	    
	        output = '<span class="timestamp">$time</span> * ' + test+ ' $description';
    	    break;
    	case 'msgRaw':
    	    output = '<span class="timestamp">$time</span> <span style="color:#23dbef;font-weight:bold">-</span><span style="color:#fff;font-weight:bold">!</span><span style="color:#23dbef;font-weight:bold">-</span> $description';
    	    break;
	    case 'msgJoin':
	    		test = messageDetails[USERHOST_KEY];
	    		
	    		if (test == '') {
	    			test = '$nickname@hostname.unavailable';
	    		}
	        output = '<span class="timestamp">$time</span> <span style="color:#23dbef;font-weight:bold">-</span><span style="color:#fff;font-weight:bold">!</span><span style="color:#23dbef;font-weight:bold">-</span> <span style="color:#23dbef;font-weight:bold">$nickname</span> <span style="color:#726E5C">[</span><span style="color:#23dbef">' + test + '</span><span style="color:#726E5C">]</span> has joined <span style="font-weight:bold">' + messageDetails[LOCATION_KEY] + '</span>';
    	    break;
    	case 'msgPart':
	        output = '<span class="timestamp">$time</span> <span style="color:#23dbef;font-weight:bold">-</span><span style="color:#fff;font-weight:bold">!</span><span style="color:#23dbef;font-weight:bold">-</span> <span style="color:#23dbef;font-weight:bold">$nickname</span> <span style="color:#726E5C">[</span><span style="color:#fff">' + messageDetails[USERHOST_KEY] + '</span><span style="color:#726E5C">]</span> has left <span style="color:#fff;font-weight:bold">' + messageDetails[LOCATION_KEY] + '</span> <span style="color:#726E5C">[</span><span style="color:#fff">$description</span><span style="color:#726E5C">]</span>';
    	    break;
    	case 'msgQuit':
	        output = '<span class="timestamp">$time</span> <span style="color:#23dbef;font-weight:bold">-</span><span style="color:#fff;font-weight:bold">!</span><span style="color:#23dbef;font-weight:bold">-</span> <span style="color:#23dbef;font-weight:bold">$nickname</span> <span style="color:#726E5C">[</span><span style="color:#fff">' + messageDetails[USERHOST_KEY] + '</span><span style="color:#726E5C">]</span> has quit <span style="color:#726E5C">[</span><span style="color:#fff">$description</span><span style="color:#726E5C">]</span>';
    	    break;
    	case 'msgKick':
    		        output = '<span class="timestamp">$time</span> <span style="color:#23dbef;font-weight:bold">-</span><span style="color:#fff;font-weight:bold">!</span><span style="color:#23dbef;font-weight:bold">-</span> <span style="color:#23dbef;">$recipient</span> was kicked from <span style="color:#fff;font-weight:bold">' + messageDetails[LOCATION_KEY] + '</span> by <span style="color:#fff;font-weight:bold">$nickname</span> <span style="color:#726E5C">[</span><span style="color:#fff">$description</span><span style="color:#726E5C">]</span>';
    	    break;
    	case 'msgModeChange':
    	
    		if (messageDetails[LOCATION_KEY][0] == '#') {
    	   		output = '<span class="timestamp">$time</span> <span style="color:#23dbef;font-weight:bold">-</span><span style="color:#fff;font-weight:bold">!</span><span style="color:#23dbef;font-weight:bold">-</span> mode/<span style="color:#23dbef">' +  messageDetails[LOCATION_KEY] + '</span> <span style="color:#726E5C">[</span>$description<span style="color:#726E5C">]</span> by <span style="color:#fff;font-weight:bold">$nickname</span>';
       	    } else {
    	    	output = '<span class="timestamp">$time</span> <span style="color:#23dbef;font-weight:bold">-</span><span style="color:#fff;font-weight:bold">!</span><span style="color:#23dbef;font-weight:bold">-</span> Mode change <span style="color:#726E5C">[</span><span style="color:#fff">$description</span><span style="color:#726E5C">]</span> for user ' + messageDetails[LOCATION_KEY];
       	    }
    	    break;
    	case 'msgNick':
    	    output = '<span class="timestamp">$time</span> <span style="color:#23dbef;font-weight:bold">-</span><span style="color:#fff;font-weight:bold">!</span><span style="color:#23dbef;font-weight:bold">-</span> <span style="color:#23dbef">$nickname</span> is now known as <span style="color:#23dbef;font-weight:bold">$description</span>';
    	    break;
    	case 'msgTopicChange':
    	case 'msgTopicReply':
    		if (messageDetails[NICKNAME_KEY] != '') {
	    	    output = '<span class="timestamp">$time</span> <span style="color:#23dbef;font-weight:bold">-</span><span style="color:#fff;font-weight:bold">!</span><span style="color:#23dbef;font-weight:bold">-</span> <span style="color:#fff;font-weight:bold">$nickname</span> changed the topic of <span style="color:#fff;font-weight:bold">' + messageDetails[LOCATION_KEY] + '</span> to: $description';
    	    }
    	    
    	   	document.getElementById('topicText').innerHTML = linkify(messageDetails[DESCRIPTION_KEY]);
    	    break;
    	case 'msgTopicDetailsReply':
			break;
    	case 'msgNotice':    		
    		if (messageDetails[DESCRIPTION_KEY][0] == '*' && messageDetails[DESCRIPTION_KEY][1] == '*' && messageDetails[DESCRIPTION_KEY][2] == '*') {
    	    	output = '<span class="timestamp">$time</span> <span style="color:#4DA91E">!$nickname</span> $description';
    		} else {  
    			var ss = '';
    			
    			if (messageDetails[USERHOST_KEY] != '') {
    				ss = '<span style="color:#726E5C">(</span><span style="color:#B23BC7">' +  messageDetails[USERHOST_KEY] + '</span><span style="color:#726E5C">)</span>';
    			}
    			  			
    			output = '<span class="timestamp">$time</span> <span style="color:#726E5C;font-weight:bold">-</span><span style="color:#DB40F4;font-weight:bold">$nickname</span>' + ss + '<span style="color:#726E5C;font-weight:bold">-</span> $description';

    		}
    	    break;
    	case 'msgNoticeAuth':
    	    output = '<span class="timestamp">$time</span> <span style="color:#4DA91E">!$nickname</span> $description';
    	    break;
	}

    if (output != '') {
        output = expandVariables(output, messageDetails);
        
        var lineElement = document.createElement('p')
        lineElement.setAttribute('id', messageDetails[POST_ID_KEY]);
        lineElement.setAttribute('nickname', messageDetails[NICKNAME_KEY]);
        lineElement.setAttribute('highlight', isHighlighted);
        lineElement.setAttribute('onmouseover', "spotlightUserMessagesFor('" + messageDetails[NICKNAME_KEY].replace('\\', 'SLASH')  + "')");
        lineElement.setAttribute('onmouseout', "unSpotlightUserMessagesFor('" + messageDetails[NICKNAME_KEY].replace('\\', 'SLASH')  + "')");
        
        lineElement.innerHTML = output;
        document.getElementById('content').appendChild(lineElement);
	
	    return true;
    }
    
	return false;
}

function nearBottom() {
	return ( document.body.scrollTop >= ( (document.getElementById('content').offsetHeight ) - ( window.innerHeight * 1.2 ) ) );
}

function scrollToBottom(ignorePosition) {		
	if (ignorePosition || (!ignorePosition && nearBottom()))
	    document.body.scrollTop = document.getElementById('content').offsetHeight;	
}

function updateOverlayHeight(){
	if($('body').hasClass('query') || $('body').hasClass('console')) {
		if(document.getElementById('content').offsetHeight > $(window).height()){
			$('#overlay').height(document.getElementById('content').offsetHeight);
		} else {
			$('#overlay').height($(window).height());
		}
	} else {
		if(document.getElementById('content').offsetHeight+15 > $(window).height()){
			$('#overlay').height(document.getElementById('content').offsetHeight+15);
		} else {
			$('#overlay').height($(window).height());
		}
	
	}
}

function unfocus() {
	$('#overlay').fadeIn();	
	updateOverlayHeight();		
}

function focus() {
	$('#overlay').fadeOut();
	updateOverlayHeight();
}

function collapseTopic(){
    topicIsExpanded = false;
    $('#topic span').css('overflow', 'hidden');
    $('#topic span').css('white-space', 'nowrap');
    var span = $('#topic span').css('min-height');
    var topicer = $('#topic').css('min-height');
    $('#topic').stop().animate({ height: topicer }, 300);
    $('#topic span').stop().animate({ height: span }, 300);
}

function expandTopic(){
    var span = $('#topic span').css('min-height'); 
    $('#topic span').css('overflow', 'visible');
    $('#topic span').css('height', 'auto');
    $('#topic span').css('white-space', 'normal');

    var currentHeight = $('#topic span').height() + 'px';
      
      if (span != currentHeight) {
          topicIsExpanded = true;

          $('#topic').css('height', 'auto');
          $('#topic span').css('height', 'auto');
      } else {
        $('#topic span').css('overflow', 'hidden');
        $('#topic span').css('height', span);
      }
}

function toggleTopic(){
    var e = window.event;
    e.stopPropagation();
        
    if (e.target.nodeName != 'A' && e.target.nodeName != 'IMG') { 
        if (topicIsExpanded) {
          collapseTopic();
        } else {
          expandTopic();
        } 
    }
}

function showInspector() {
    if (typeof window.linkinus.showInspector !== 'undefined') {
	    window.linkinus.showInspector();
	}
}

function scrollTo(id) {
	var curr = $('#'+id).offset().top - 30;
    $('body').animate({scrollTop: curr}, 700);			
}

function spotlightUserMessagesFor(nick){    
    if (spotlightUserMessagesOnHoverEnabled) {
     $('p[nickname=' + nick +']').each(function(i){
         
            lastBGColor = $(this).css('color');
        	
        	$(this.children).each(function(i){
        	    if ($(this).attr('starred') != 'true') {
                    $(this).css('color', '#726E5C');
                }
            });
        
            if ($(this).attr('starred') != 'true') {
                    $(this).css('color', '#726E5C');
            }
    	});
	}
}

function unSpotlightUserMessagesFor(nick){	
    if (spotlightUserMessagesOnHoverEnabled) {
     $('p[nickname=' + nick +']').each(function(i){
             $(this.children).each(function(i){
    		$(this).css('color', lastBGColor);
             });
    		$(this).css('color', lastBGColor);

    	});	
	}		
}

function deleteFirstMessage() {	    
    $('p:first').remove();
        
    return $('p').size();
}

function prevHighlight() {	 
	var blah = $('body').scrollTop();
	var arrOffset = [];
	$('p[highlight=true]').each(function(i){
		arrOffset[i] = $(this).offset().top - 30;	
		if(arrOffset[i-1] != blah) {	
			if(i==0 && $('body').scrollTop() < arrOffset[i]) {
				$('body').stop().animate({scrollTop: arrOffset[i]}, 700);
				return;
			} else if($('body').scrollTop() >= arrOffset[i-1] && $('body').scrollTop() <= arrOffset[i]) {
				$('body').stop().animate({scrollTop: arrOffset[i-1]}, 700);
				return;
			} else if($('body').scrollTop() > arrOffset[i]) {
				$('body').stop().animate({scrollTop: arrOffset[i]}, 700);
				return;
			
			}
		}		
	});			
}

function nextHighlight() {	
	var arrOffset = [];
	$('p[highlight=true]').each(function(i){
		arrOffset[i] = $(this).offset().top - 30;	
		var blah = arrOffset.length;			
		if(i==0 && $('body').scrollTop() < arrOffset[i]) {
			$('body').stop().animate({scrollTop: arrOffset[i]}, 700);
			return;
		} else if($('body').scrollTop() >= arrOffset[i-1] && $('body').scrollTop() <= arrOffset[i]) {
			$('body').stop().animate({scrollTop: arrOffset[i]}, 700);
			return;
		}			
	});	
	if($('body').scrollTop() == arrOffset[arrOffset.length-1]) {
		$('body').stop().animate({scrollTop: $('#content').height()}, 700);
		return;	
	}
}

function showConnectionHintBox(network, server, nickname, realname){
	$('#content p').remove();
	
	/*
	var MESSAGE_TYPE_KEY = 0;
var POST_ID_KEY = 1;
var NICKNAME_KEY = 2;
var DESCRIPTION_KEY = 3;
var TIMESTAMP_KEY = 4;
var NICK_COLOR_KEY = 5;
var EXTRA_DATA_KEY = 6;
var POST_TYPE_KEY = 7;
var HIGHLIGHTED_KEY = 8;
var STARRED_KEY = 9;
var ALLOW_EMBEDDING_KEY = 10;
var MESSAGE_DIRECTION_KEY = 11;
var USER_IMAGE_URL_KEY = 12;
var LOCATION_KEY = 13;
var USERHOST_KEY = 14;
var DISPLAY_UNENCRYPTED_KEY = 15;
*/
	console.log('hintbox');
	canAppendMessage = true;
	appendMessage([ "msgRaw", "-1", "style", '<span style="color:#fff;font-weight:bold">Linkinus:</span> Looks like this is the first time you\'ve run Linkinus.', lastTimestamp, '0', "1", 0, 0, 0, 0, 0, "", "", "", 0]);
	appendMessage([ "msgRaw", "-1", "style", '<span style="color:#fff;font-weight:bold">Linkinus:</span> This is just a reminder that you really should go read', lastTimestamp, '0', "1", 0, 0, 0, 0, 0, "", "", "", 0]);
	appendMessage([ "msgRaw", "-1", "style", '<span style="color:#fff;font-weight:bold">Linkinus:</span>  the wiki if you haven\'t already. You can find it', lastTimestamp, '0', "1", 0, 0, 0, 0, 0, "", "", "", 0]);
	appendMessage([ "msgRaw", "-1", "style", '<span style="color:#fff;font-weight:bold">Linkinus:</span> and more beginner info at http://conceited.net/wiki', lastTimestamp, '0', "1", 0, 0, 0, 0, 0, "", "", "", 0]);
	appendMessage([ "msgRaw", "-1", "style", '<span style="color:#fff;font-weight:bold">Linkinus:</span> ', lastTimestamp, '0', "1", 0, 0, 0, 0, 0, "", "", "", 0]);
	appendMessage([ "msgRaw", "-1", "style", '<span style="color:#fff;font-weight:bold">Linkinus:</span> For the truly impatient people who don\'t like reading', lastTimestamp, '0', "1", 0, 0, 0, 0, 0, "", "", "", 0]);
	appendMessage([ "msgRaw", "-1", "style", '<span style="color:#fff;font-weight:bold">Linkinus:</span> documentation, just click here: <span style="color:#726E5C">[</span><a href="#" onclick="configureStyle();return false;">Open Preferences...</a><span style="color:#726E5C">]</span>', lastTimestamp, '0', "1", 0, 0, 0, 0, 0, "", "", "", 0]);
	appendMessage([ "msgRaw", "-1", "style", '<span style="color:#fff;font-weight:bold">Linkinus:</span>  and play around.', lastTimestamp, '0', "1", 0, 0, 0, 0, 0, "", "", "", 0]);
	appendMessage([ "msgRaw", "-1", "style", '<span style="color:#fff;font-weight:bold">Linkinus:</span> ', lastTimestamp, '0', "1", 0, 0, 0, 0, 0, "", "", "", 0]);
	appendMessage([ "msgRaw", "-1", "style", '<span style="color:#fff;font-weight:bold">Linkinus:</span> For Mac OS X specific help type "/connect irc.freenode.net"', lastTimestamp, '0', "1", 0, 0, 0, 0, 0, "", "", "", 0]);
	appendMessage([ "msgRaw", "-1", "style", '<span style="color:#fff;font-weight:bold">Linkinus:</span> and "/join #macosx" (without the quotes) and ask your', lastTimestamp, '0', "1", 0, 0, 0, 0, 0, "", "", "", 0]);
	appendMessage([ "msgRaw", "-1", "style", '<span style="color:#fff;font-weight:bold">Linkinus:</span> question.', lastTimestamp, '0', "1", 0, 0, 0, 0, 0, "", "", "", 0]);
	canAppendMessage = false;
	
	var autoClose = setTimeout("hideConnectionHintBox()",3000);

	
}


function configureStyle(){
    if (typeof window.linkinus.showStylePreferences !== 'undefined') {
	    window.linkinus.showStylePreferences();
	}
}


function hideConnectionHintBox(){
	canAppendMessage = true;
}