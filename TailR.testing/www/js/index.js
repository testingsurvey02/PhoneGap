// For Testing in Browser
/*
$(function() {
	if(testingInternet){
		getTailorDetailsDataFromServer();
		getCategoriesDataFromServer();
		getProductDataFromServer();
		getAttributesDataFromServer();
	}
	getTailorDetailsFromLocal();
	loadDataFromServer();
});

*/
$( document ).on( "mobileinit", function() {
    // Make your jQuery Mobile framework configuration changes here!
	 $.support.cors = true;
     $.mobile.allowCrossDomainPages = true;
     
     jQuery.mobile.phonegapNavigationEnabled = true;
     jQuery.mobile.defaultDialogTransition = "pop";
     jQuery.mobile.defaultPageTransition = "none";
      
     jQuery.mobile.loader.prototype.options.text = "loading";
     jQuery.mobile.loader.prototype.options.textVisible = true;
     jQuery.mobile.loader.prototype.options.theme = "a";
     
     $.mobile.toolbar.prototype.options.updatePagePadding = false;
     $.mobile.toolbar.prototype.options.hideDuringFocus = "";
     $.mobile.toolbar.prototype.options.tapToggle = false;
});

$(document).delegate('.image-download', 'taphold', function () {
	console.log('Hi....taphold......single-option.....');
	var imagePath =  $(this).attr('src');
	if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
		var isOK = confirm("Are you want to redownload the image?");
		if(isOK){
			//$(this).attr('src', '');
			var folderType = $(this).data('folder_type');
			var imageId;
			var imageName;
			var parentId;
			var urlLink;
			//imagePath = localPath + ''
			if(folderType == 'attributes'){
				imageId = $(this).data('imgt_opt_id');
				imageName = $(this).data('opt_img');
				parentId = $(this).data('imgt_attrid');
				//console.log('Download Images -- optid : '+ optid + ' optionsrc : '+optionsrc + ' attrid : '+attrid);
				urlLink = attributeImageData + '/' + imageName;
			}else if(folderType == 'gallery'){
				parentId  = $(this).data('prod_id');
				imageId  = $(this).data('childgalid');
				imageName  = $(this).data('gallname');
				//$('.product-img'+imageId).attr('src','');
				//console.log('Download Images -- prod_id : '+ prod_id + 'galid : '+galid + ' gallname : '+gallname);
				urlLink = productImageData + '/' + imageName;
			}
			downloadFileValidatorFn(urlLink, folderType, imageName, imageId, parentId,1);
			//$(this).attr('src',imagePath);
		}
	}
});

var connectionType;
var appName='TailorRani';
var appUrlMain = 'http://tailor.craftiapp.com/';
var testingInBrowser=false;// For Testing
var testingInternet = false;
var syncTailorDetails = false;
var loginUserId;
var dataIsFromServer = 0;
var measurementTypeDiv = 0;
var orderMeasurementDiv = 0;
var customerTypeDiv = 0;
var tailorDetailsJsonData;
var categoriesJsonData;
var attributeJsonData;
var productJsonData;
var measurementJsonData;
var staticJsonData;
var attributeImageJsonData;
var galleryImageJsonData;
var orderDataFromServer;
var customerDataFromServer;
var updateCustomerDetailsForSavedData;
var updateCustomerDetailsForUpdatedData;
var updateOrderDetailsForSavedData;
var updateOrderDetailsForUpdatedData;
var needUpdate = false;
var syncCustomerOrderDetails = false;
var measurementTypeId = 0;
//Variables Declarations
var catArrSession=[];
var subCatArrSession=[];
var productDetailsArrSession = [];
var attrDetailsArrSession = [];
var measurementArrSession = [];
var staticArrSession = [];
var attrImagesArrSession = [];
var galleryImagesArrSession = [];
var measurementTypeId = '';
var orderArrSession = [];
var customerArrSession = [];
var tailorDetailsSession = {};
var dataSyncTypeTailor = 1;
var dataSyncTypeCategory = 2;
var dataSyncTypeProduct = 3;
var dataSyncTypeAttribute = 4;
var dataSyncTypeMeasurement = 5;
var dataSyncTypeCustomer = 6;
var dataSyncTypeOrder = 7;
var measurementsData;
var deleteRecordsInLocalDBJsonData = [];
var needToDeleteInJSonArrayMeasuGroup = [];
var needToDeleteInJsonArrayProductGall = [];
var needToDeleteInJsonArrayAttrOptions = [];
var needToDeleteInJSonArrayMeasurements = [];
var deleteRecordStatus = 1;
var sendCustomerDataToSaveInServer = [];
var sendCustomerDataToUpdateInServer = [];
var sendOrderDataToSaveInServer = [];
var sendOrderDataToUpdateInServer = [];
var sendDataToServerStatus = false;
var totalProductImages = 0;
var downloadedProductImages = 0;
var notDownloadedProductImages = 0;
var totalAttrOptImages = 0;
var downloadedAttrOptImages = 0;
var notDownloadedAttrOptImages = 0;
var dataExist = false;
var mobileUUID = '';

var rightPanelObj = '<div id="menu-wrapper">'+
							'<div class="menu-title">'+
						    	'<span>SETTING</span>'+
						    '</div>'+
						
							'<ul class="menu">'+
							
								'<li class="profile-detail person_details_right_panel">'+
									'<div class="person_details">'+
										'<div class="circular">'+'</div>'+
										'<span class="details-data name">'+window.localStorage["name"]+'</span>'+
									'</div>'+
									'<div class="sub_info">'+
										'<img src="img/icons/email118.png" alt="email">'+'</a>'+
										'<span class="email details-data">'+window.localStorage["username"]+'</span>'+
									'</div>'+
									'<div class="sub_info">'+
										'<img src="img/icons/contact1.png" alt="contacts">'+'</a>'+
										'<span class="contact_number details-data">'+window.localStorage["mobile"]+'</span>'+
									'</div>'+
								'</li>'+
								
								'<li class="icon notification">'+
									'<a href="#notification-page" data-rel="close" >'+
										'<span class="menu-li-title">Notifications</span>'+
									'</a>'+
								'</li>'+
								'<li class="icon logout">'+
									'<a href="#" onclick="doLogout();" data-rel="close">'+
										'<span class="menu-li-title">Logout</span>'+
									'</a>'+
								'</li>'+
							'</ul>'+
						'</div>';

var leftPanelObjEmpty = '<div id="menu-wrapper">'+			
								'<div class="menu-title">'+
							    	'<span>MENU</span>'+
							    '</div>'+
								'<ul class="menu">'+	
								'</ul>'+
							'</div>';
var leftPanelObj = '<div id="menu-wrapper">'+			
						'<div class="menu-title">'+
					    	'<span>MENU</span>'+
					    '</div>'+
						'<ul class="menu">';	
var leftPanelObjForTailor= 					
							'<li class="icon desciplines">'+
								'<a href="#" onclick="getSample();" data-rel="close">'+
									'<span class="menu-li-title">Sample Link</span>'+
									'<img class="menu-li-arrow" src="img/icons/arrow-forward.png" alt="">'+
								'</a>'+
							'</li>';

var ajaxCallGet = "GET";
var ajaxCallPost = "POST";
var ajaxCallUnset = "GET";
var dynPanelCount = 1,
dynPanelBtnCount = 1;
var noDataFoundMsg = "No data found.";
//$(document).one('pagebeforecreate', function () {});

function panelsInitialization(initLeftPanelFlag, initRightPanelFlag, roleId){
	dynPanelCount = 1;
	dynPanelBtnCount = 1;
    
	$.mobile.pageContainer.find("[data-role=page]").each(function () {
		var currPanelObj = $(this).find(".st-leftPanel");
		var panelFoundFlag = currPanelObj.length;
		
		if($(this).attr("id") == "login-page"){
			if(panelFoundFlag == 0){
				var leftPanelDynObj='<div id="leftPanel' + dynPanelCount + '" class="panel left st-leftPanel" data-role="panel" data-position="left" data-display="push"></div>';
		        var rightPanelDynObj = '<div id="rightPanel' + dynPanelCount + '"  class="panel right st-rightPanel" data-role="panel" data-position="right" data-display="push"></div>';
		        $(this).prepend(leftPanelDynObj);
		        $(this).prepend(rightPanelDynObj);
			}    
		}
		else{
			if(panelFoundFlag == 0){
				var leftPanelDynObj="";
		        leftPanelDynObj += '<div id="leftPanel' + dynPanelCount + '" class="panel left st-leftPanel" data-role="panel" data-position="left" data-position-fixed="true" data-display="push" >';
		        
		        leftPanelDynObj += leftPanelObj + leftPanelObjForTailor;
		        leftPanelDynObj += '</ul>'+'</div>'+'</div>';
		        
		        var rightPanelDynObj = '<div id="rightPanel' + dynPanelCount + '"  class="panel right st-rightPanel" data-role="panel" data-position="right" data-position-fixed="true" data-display="overlay" >'+
		        						rightPanelObj + '</div>';
		        
		        $(this).prepend(leftPanelDynObj);
		        $(this).prepend(rightPanelDynObj);
			}
			else{
				console.log("panel--"+$(this).attr("id")+"---"+currPanelObj.find(".ui-panel-inner").length);
				//if(roleId==0){
					currPanelObj.find("#menu-wrapper .menu").html(leftPanelObjForTailor);
					if(currPanelObj.find(".ui-panel-inner").length == 0){
						currPanelObj.find(".ui-panel-inner ul.menu").html(leftPanelObjForTailor);
					}
		        //}
			}
	        dynPanelCount++;
	        
	        var btnFoundFlag = $(this).find("[data-role=header] .st-leftPanel-btn").length;
	        if(btnFoundFlag == 0){
	        	var leftPanelDynBtn='<a href="#leftPanel' + (dynPanelBtnCount) + '" data-theme="none" data-inline="true" class="ui-btn ui-btn-left st-leftPanel-btn edit-logo" title="Menu">'+
	    		'<img src="img/edit-sm-logo.png" alt="logo" /></a>';
	
	    		var rightPanelDynBtn='<div class="ui-btn-right right-space">'+
			    							'<a href="#notification-page" class="ui-btn ui-shadow ui-corner-all st-rightPanel-btn no-border margin-right notification-count-link"  title="Notification"><span class="">0</span></a>'+
			    							'<a href="#rightPanel' + (dynPanelBtnCount) + '" class="ui-btn ui-corner-all ui-icon-gear ui-btn-icon-notext st-rightPanel-btn no-border"  title="Setting"> </a>'+
			    						'</div>';
	    		$(this).find("[data-role=header]").append(leftPanelDynBtn);
	    		$(this).find("[data-role=header]").append(rightPanelDynBtn);
	        }
			dynPanelBtnCount++;	
		}	
    }); 
}

$(document).on("pageinit", function () {
    
});

//var appUrl='http://192.168.1.11:8080/TailorRani/appEntries.php';
var appUrl = '';
var appRequiresWiFi='This action requires internet.';
var serverBusyMsg='Server is busy, please try again later.';
var mData={};
var db= null;
var pushNotification;

var app = {
    SOME_CONSTANTS : false,  // some constant
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        this.initFastClick();
    },
	
    // Bind Event Listeners Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    initFastClick : function() {
        window.addEventListener('load', function() {
            FastClick.attach(document.body);
        }, false);
    },
    // Phonegap is now ready...
    onDeviceReady: function() {
        document.addEventListener("backbutton", onBackKeyDown, false);
        mobileUUID = device.uuid;
        console.log(mobileUUID);
        if(window.localStorage["gcmregistrationId"] === undefined ) {
			window.localStorage["gcmregistrationId"] = "";
		}
		/*pushNotification = window.plugins.pushNotification;
		try{
        	pushNotification = window.plugins.pushNotification;
        	pushNotification.register(successHandler, errorHandler, {"senderID":"329763220550","ecb":"onNotification"});		// required!
        }
		catch(err){
			var txt="There was an error on this page.\n\n"; 
			txt+="Error description: " + err.message + "\n\n"; 
			console.log(txt); 
		}*/
		
        if(window.localStorage["appUrl"] === undefined ) {
        	window.localStorage["appUrl"] = '';
        }
        else{
        	//appUrl=window.localStorage["appUrl"];
        	//checkPreAuth();
        }	
        
        $('#versionLoginId').text(AppVersion.version);
        $('#versionHomeId').text(AppVersion.version);
        
        //console.log("DB CALL");
        db = window.sqlitePlugin.openDatabase({name: "tailorrani.db", location: 2});
        // db = window.sqlitePlugin.openDatabase({name: "tailorrani.db", location: 2});
        // db = window.openDatabase("Database", "1.0", "tailorrani.db", 200000);
		db.transaction(initializeDB, errorCB, successCB);
        
		// FIXME PUT CONDITIONS
		// LOAD DATA FROM SERVER
		// UPDATE TO SERVER
		// UPDATE DATA FROM SERVER
		window.localStorage["dbreadyflag"] = 0;
		
		if(window.localStorage["productimgflag"] != undefined) {
			
		}else{
			window.localStorage["productimgflag"] = 0;
		}
		
		//loadDataFromServer();
    },
};

function fail() {
    console.log("failed to get filesystem");
}

//handle GCM notifications for Android
function onNotification(e) {
    switch( e.event ){
        case 'registered':
			if ( e.regid.length > 0 ){
				// Your GCM push server needs to know the regID before it can push to this device
				// here is where you might want to send it the regID for later use.
				console.log("regID = " + e.regid);
				window.localStorage["gcmregistrationId"] = e.regid;
			}
        break;
        
        case 'message':
        	// if this flag is set, this notification happened while we were in the foreground.
        	// you might want to play a sound to get the user's attention, throw up a dialog, etc.
        	if (e.foreground){
        		//console.log("INLINE NOTIFICATION");
			    // on Android soundname is outside the payload. 
			}
			else{	
				// otherwise we were launched because the user touched a notification in the notification tray.
				if (e.coldstart){}
					//console.log("COLDSTART NOTIFICATION");
				else{}
					//console.log("BACKGROUND NOTIFICATION");
			}
        	var dataNotifyObj = '<li>'+
									'<div class="main-content">'+
										'<div class="feat_small_icon">'+
											'<i class="fa fa-bell-o"></i>'+
										'</div>'+
										'<div class="feat_small_details">'+
											'<h5> '+ e.payload.message +' </h5>'+
											'<a href="#" class="ui-link"> '+getTodayDate();+' </a>'+
										'</div>'+
									'</div>'+	
								'</li>';
			var $notificationUlObj = $("#notification-page").find("ul.features_list_detailed");
        	$notificationUlObj.append(dataNotifyObj);
        	
        	var currentNotificationCount = $(".notification-count-link span").html();
        	var currentNotificationCountNew = parseInt(currentNotificationCount) + 1;
        	$(".notification-count-link span").html(currentNotificationCountNew);
        	$(".notification-count-link").show();        	
			//console.log(e.payload.message+"---"+e.payload.msgcnt);
            //android only
        	break;
        
        case 'error':
			 console.log(e.msg);
			 break;
        
        default:
		 	console.log(" Unknown, an event was received and we do not know what it is");
        	break;
    }
}

function successHandler (result) {
    console.log(result);
}

function errorHandler (error) {
    console.log(error);
}

function showModal(){
  $('body').append("<div class='ui-loader-background'> </div>");
  $.mobile.loading( "show" );
}

function hideModal(){
	 $(".ui-loader-background").remove();
	 $.mobile.loading( "hide" );
}

function onBackKeyDown() {
	if($.mobile.activePage.is('#login-page')){
        showExitDialog();
    }
	else if($.mobile.activePage.is('#product-page')){
        /* 
        Event preventDefault/stopPropagation not required as adding backbutton
         listener itself override the default behaviour. Refer below PhoneGap link.
       */
       //e.preventDefault();
       showExitDialog();
   }
	else if($.mobile.activePage.is('#page-2')){
       $.mobile.changePage('#product-page','slide');
   }
	else{
		$.mobile.changePage('#product-page','slide');
		//window.history.back();
   }
}

function checkConnection() {
	if(testingInBrowser){
		if(testingInternet){
			connectionType="WiFi connection";//For Testing
		}else{
			connectionType="Unknown connection";//For Testing
		}
		return connectionType;
	}
	
    var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    //states[Connection.CELL_5G]  = 'Cell 5G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';
    
    if(typeof states[networkState]==='undefined'){
		return 'Unknown connection';;
    }
    return states[networkState];
}

function checkPreAuth() {
	connectionType=checkConnection();
	if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
		var form = $("#loginForm");
		
		if(window.localStorage["username"] != undefined && window.localStorage["password"] != undefined && window.localStorage.getItem("user_logged_in")==1) {
			$("#username", form).val(window.localStorage["username"]);
			$("#password", form).val(window.localStorage["password"]);
			handleLogin();
		}
	}
	else{
		navigator.notification.alert(appRequiresWiFi, exitAppForcefully, appName,'Ok');
	}
}

function logout() {
	window.localStorage["password"] = '';
	window.localStorage["user_logged_in"] = 0;
	window.localStorage["ID"] = '';
	window.localStorage["permissions"] = '';
	window.localStorage["email"] = '';
	var form = $("#loginForm");
	$("#username", form).val(window.localStorage["username"]);
	$("#password", form).val('');
	$(".schoolCodeContainer").hide();
	$(".loginFormContainer").show();
	$.mobile.changePage('#login-page','slide');
}

function loginFn(){
	loginUserId = $('#username').val();
	//console.log(loginUserId);
	if(loginUserId == 'undefined' || loginUserId == ''){
		alert('Sorry please login with User Id');
	}else if(loginUserId != 'undefined' && loginUserId != ''){
		showModal();
		loadDataFromServer();
	}
}

function gotoLoginPage(){
	$.mobile.changePage('#login-page','slide');
	$("#login-page").on("pageshow" , function() {
		 $('#login-page').scrollTop(0);
	 });
	return false;
}

function gotoAboutUsPage(){
	attributeArrayToSave=[];
	optionArrayToSave=[];
	optionImageFullName=[];
	optionImageName=[];
	attrNameArray = [];
	/*$('html,body').animate({
        scrollTop: $("#aboutUs-page").offset().top},
        'slow');*/
	$.mobile.changePage('#aboutUs-page','slide');
	$("#aboutUs-page").on("pageshow" , function() {
		 $('#aboutUs-page').scrollTop(0);
	 });
}

function cancelOrderAboutUsPage(){
	navigator.notification.confirm(
            ("Are you sure you want to cancel the order?"), // message
            callAboutUsPage, // callback
            appName, // title
            'YES,NO' // buttonName
    );
}

function callAboutUsPage(button){
	if(button=="1" || button==1){
		gotoAboutUsPage();
    }
}

function gotoStatusReportPage(){
	$.mobile.changePage('#status-report-page', 'slide');
	$("#status-report-page").on("pageshow" , function() {
		 $('#status-report-page').scrollTop(0);
	 });
}

function cancelOrderProductPage() {
    navigator.notification.confirm(
    		("Are you sure you want to cancel the order?"), // message
            callProductPage, // callback
            appName, // title
            'YES,NO' // buttonName
    );
}

//Call exit function
function callProductPage(button){
    if(button=="1" || button==1){
    	gotoProductPage();
    }
}

function gotoProductPage(){
	attributeArrayToSave=[];
	optionArrayToSave=[];
	optionImageFullName=[];
	optionImageName=[];
	attrNameArray = [];
	$.mobile.changePage('#product-page','slide');
	$("#product-page").on("pageshow" , function() {
		 $('#product-page').scrollTop(0);
	 });
}

function gotoAttributePageDiv(){
	$.mobile.changePage('#selection-page','slide');
	$("#selection-page").on("pageshow" , function() {
		 $('#selection-page').scrollTop(0);
	 });
}

function gotoMeasurementPageDiv(){
	$.mobile.changePage('#measurement-page','slide');
	 $("#measurement-page").on("pageshow" , function() {
		 $('#measurement-page').scrollTop(0);
	 });
}

function gotoCustomerPageDiv(){
	$('#totalPriceInput').val('');
	$('#customerNameInput').val('');
	$('#contactNumberInput').val('');
	$('#emailIdInput').val('');
	$('#address1Input').val('');
	$('#address2Input').val('');
	$('#stateInput').val('');
	$('#cityInput').val('');
	$('#pincodeInput').val('');
	$('#orderDateInput').val('');
	$('#orderDeliveryDateInput').val('');
	$.mobile.changePage('#customer-confirmation-page','slide');
	$("#customer-confirmation-page").on("pageshow" , function() {
		 $('#customer-confirmation-page').scrollTop(0);
	 });
}

function gotoViewOrderDetails(){
	$.mobile.changePage('#view-order-details','slide');
	$("#view-order-details").on("pageshow" , function() {
		 $('#view-order-details').scrollTop(0);
	 });
}

function gotoDownloadImagePage(){
	$.mobile.changePage('#imageDownloadStatusPage','slide');
}

function gotoContactUsPage(){
	$.mobile.changePage('#contactUs-page','slide');
}

function gotoOrderPageDiv(){
	$('#prodHtmlName').val('');
	$('#prodHtmlId').val('');
	$('#categoryHtmlId').val('');
	$('#customerIdInput').val('');
	$('#newOrderId').val('');
	$('#customerNameInput').val('');
	$('#priceInput').val('');
	$('#contactNumberInput').val('');
	$('#addressInput').val('');
	$.mobile.changePage('#order-report-page','slide');
	$("#order-report-page").on("pageshow" , function() {
		 $('#order-report-page').scrollTop(0);
	 });
}


function showExitDialog() {
    navigator.notification.confirm(
            ("Do you want to Exit?"), // message
            alertexit, // callback
            appName, // title
            'YES,NO' // buttonName
    );
}

//Call exit function
function alertexit(button){
    if(button=="1" || button==1){
        //device.exitApp();
        navigator.app.exitApp();
    }
}

function doLogout() {
	connectionType=checkConnection();
	if(connectionType=="Unknown connection" || connectionType=="No network connection"){
		navigator.notification.alert('Logout requires active internet connection', alertConfirm, appName, 'Ok');
	}
	else if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
		showLogoutDialog();
	}
}

function alertConfirm(buttonIndex){
	// function for alert having no actions
}

function exitAppForcefully(buttonIndex){
	//Call exit function
    if(button=="1" || button==1){
        navigator.app.exitApp();
    }
}

function showLogoutDialog() {
    navigator.notification.confirm(
            ("Are you sure to Logout?"), // message
            alertlogout, // callback
            appName, // title
            'YES,NO' // buttonName
    );
}

//Call logout function
function alertlogout(button){
    if(button=="1" || button==1){
    	logout();
    }
}

function alertCustomMsg(msg){
	navigator.notification.alert(msg, alertConfirm, appName, 'Ok');	
}

function openPrivacyPolicyExternalApp(){
	var url="http://www.edit-ims.com/privacypolicy.html";
	navigator.app.loadUrl(url, { openExternal:true });
}

function handleLogin() {
	var form = $("#loginForm");
	//disable the button so we can't resubmit while we wait
	$("#submitButton",form).attr("disabled","disabled");
	var u = $("#username", form).val();
	var p = $("#password", form).val();
	
	// Default test login data
	u='tailor1';
	p='tailor'; 
	
	if(u != '' && p!= '') {
		connectionType=checkConnection();
		
		var loginData={};
		if(connectionType=="Unknown connection" || connectionType=="No network connection"){
			if(window.localStorage["user_logged_in"] ==1) {
				navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
				//$.mobile.changePage('#product-page',{ transition: "slideup"});
			}
			else{
				navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
			}	
		}
		else if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
			showModal();
			loginData.username=u;
			loginData.password=p;
			//loginData.gcmregdid = window.localStorage["gcmregistrationId"];
			loginData.gcmregdid = "reg";//For Testing
			
			$.ajax({
				//type : 'POST',
				url:appUrl,
				data : {"action":"login","loginData":JSON.stringify(loginData), "mData":JSON.stringify(mData) },
				success:function(data){
					var responseJson=jQuery.parseJSON(data);
					var responseMessage=responseJson["msg"];
					if(responseJson.statusCode == "0" ){
						//var appUserData=responseJson.appUserData;
						window.localStorage["username"] = u;
						window.localStorage["password"] = p;
						window.localStorage["user_logged_in"] = 1;
											
						if (window.localStorage.getItem("permissions") === null ) {
							window.localStorage["permissions"] = '';
						}
						
						var loginDataResponse=responseJson["loginDataResponse"];
						window.localStorage["name"] = loginDataResponse["name"];
						window.localStorage["userRoleId"] = loginDataResponse["userRoleId"];
						window.localStorage["userRoleName"] = loginDataResponse["userRoleName"];
						window.localStorage["userRoleNameSimple"] = "";// loginDataResponse["userRoleNameSimple"]; // FIXME
						
						var allData=responseJson["allData"];
						
						if(loginDataResponse["userRoleId"]==4 || loginDataResponse["userRoleId"]==9){ // 4= Parent Role, 9= Student Role
							
							$("#staff_homepage").hide();
							$("#student_homepage").show();
							
							var studData= allData["jsonObjStudData"];
							
							var studName=studData["name"];
							var studMobileNo=studData["mobileNumber"];
							var studentEmail=studData["studentEmail"];
							var age=studData["age"];
							var gender=studData["gender"];
							
							var userImgSrc = "img/avatars/avatar-male.png";
							var studImage = studData["image"];
							if(gender){
								gender='Male';
								userImgSrc = "img/avatars/avatar-male.png";
							}else{
								gender='Female';
								userImgSrc = "img/avatars/avatar-female.png";
							}
							
							var addressOne=studData["addressOne"];
							var addressTwo=studData["addressTwo"];
							var studContactNo=studData["tailorContactNo"];
							
						}
						
						// panelsInitialization(true, true, loginDataResponse["userRoleId"]);
						$.mobile.changePage('#product-page',{ transition: "slideup"});
					}else{
						window.localStorage["password"] = '';
						window.localStorage["user_logged_in"] = 0;
						window.localStorage["appUserData"] = '';
						
						window.localStorage["email"] = '';
						
						var form = $("#loginForm");
						$("#username", form).val(window.localStorage["username"]);
						$.mobile.changePage('#login-page','slide');
						
						navigator.notification.alert(responseMessage,		//'Invalid Credentials, please try again.',
						    alertConfirm, appName, 'Ok');
					}
				hideModal();
			   },
			   error:function(data,t,f){
				   hideModal();
				   navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
				   var responseJson = $.parseJSON(data);
				   if(responseJson.status==404){
					   navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
				   }
			   }
			});
		}
		else{
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
		$("#submitButton").removeAttr("disabled");
	}
	else{
		navigator.notification.alert('You must enter a username and password.', alertConfirm, appName, 'Ok');
		$("#submitButton").removeAttr("disabled");
	}
	return false;
}

function getRandomNumber(){
	var minimumNum=1;
	var maximumNum=74;
	var randomNum = Math.floor(Math.random() * (maximumNum - minimumNum + 1)) + minimumNum;
	return (randomNum-1);
}

function refreshSelect(ele,currentValue){
	// Grabbing a select field
	var el = $(ele);
	// Select the relevant option, de-select any others
	if(currentValue!=""){
		el.val(currentValue).attr('selected', true).siblings('option').removeAttr('selected');
	}
	// Initialize the selectmenu
	el.selectmenu();
	// jQM refresh
	el.selectmenu("refresh", true);
}

/** 
 * Convert seconds to hh-mm-ss format.
 * @param {number} totalSeconds - the total seconds to convert to hh- mm-ss
**/
function secondsTohhmm(totalSeconds) {
  var hours   = Math.floor(totalSeconds / 3600);
  var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
  //var seconds = totalSeconds - (hours * 3600) - (minutes * 60);
  // round seconds
  //seconds = Math.round(seconds * 100) / 100

  var result = (hours < 10 ? "0" + hours : hours);
      result += ":" + (minutes < 10 ? "0" + minutes : minutes);
      //result += ":" + (seconds  < 10 ? "0" + seconds : seconds);
  return result;
}

function getTodayDate(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1;//January is 0, so always add + 1

	var yyyy = today.getFullYear();
	if(dd<10){dd='0'+dd}
	if(mm<10){mm='0'+mm}
	//var todayString = yyyy+'-'+mm+'-'+dd;
	var todayString = dd + '/' +mm + '/' + yyyy;
	return todayString;
}

function currentDateTime() {
	var currentdate = new Date();
	var formattedSeconds=currentdate.getSeconds();
	if(formattedSeconds < 10){
		formattedSeconds = "0"+formattedSeconds;
	}
    var datetimeValue = formatdateTimeStr(currentdate.getFullYear()) + "-"
    				+formatdateTimeStr(currentdate.getMonth()+1)  +"-"
				    +formatdateTimeStr(currentdate.getDate()) 
	                +"T" 
	                + formatdateTimeStr(currentdate.getHours()) + ":"  
	                + formatdateTimeStr(currentdate.getMinutes()) + ":" 
	                + formatdateTimeStr(currentdate.getSeconds());
	return datetimeValue;
}

function formatdateTimeStr(i) {
    return (i < 10) ? "0" + i : "" + i;
}

function calculateDateTimeDiff(old_date,new_date) {
	// The number of milliseconds in one second
     var ONE_SECOND = 1000;
     // Convert both dates to milliseconds
     var old_date_obj = new Date(old_date).getTime();
     var new_date_obj = new Date(new_date).getTime();
     // Calculate the difference in milliseconds
     var difference_ms = Math.abs(new_date_obj - old_date_obj)
     // Convert back to totalSeconds
     var totalSeconds = Math.round(difference_ms / ONE_SECOND);
     //alert('total seconds--' +totalSeconds);
     return totalSeconds;
}

//The directory to store data
var store;
var storeExternal;

//Used for status updates
var $status;

/* ************* Database Code Starts   -------------------------  */
// Open Database
function openDatabase() {
   db.transaction(initializeDB, errorCB, successCB);
}
//Close Database
function closeDatabase() {
}
// InitializeDB the database 
function initializeDB(tx) {
	tx.executeSql('CREATE TABLE IF NOT EXISTS category(id integer primary key autoincrement, server_cat_id integer, parent_id integer,name text,update_timestamp text, description text, catImage text, catStatus integer, children text, sort_order text)');
	tx.executeSql('CREATE TABLE IF NOT EXISTS product_details (id integer primary key autoincrement, server_prod_id integer, name text, description text, update_timestamp text, measurement_typeid integer, status integer, attribute_details text, gallery text, category text)');
	tx.executeSql('CREATE TABLE IF NOT EXISTS product_attributes (id integer primary key autoincrement, server_attr_id integer, name text, identifier text, status integer, backend_name text, update_timestamp text, option text)');
	tx.executeSql('CREATE TABLE IF NOT EXISTS measurement_details (id integer primary key autoincrement, name text, server_measurement_id integer, status integer, update_timestamp text, group_data text)');
	tx.executeSql('CREATE TABLE IF NOT EXISTS customer_details (id integer primary key autoincrement,name text, total_price text, advance_price text, balance_price text, update_timestamp text, contact_number text, email_id text, country text, state text, city text, pincode text, address_one text, address_two text, sync_date text, sync_status integer, cust_server_id integer, is_deleted integer)');
	tx.executeSql('CREATE TABLE IF NOT EXISTS order_details(id integer primary key autoincrement, server_cat_id integer, cat_name text, server_prod_id integer, order_data text,update_timestamp text, server_prod_name text,customer_id integer, option_selected text, status_of_order text, gallery_id integer, gallery_name text, sync_date text, sync_status integer, order_server_id integer, order_date text, order_delivery_date text, is_deleted integer)');
	tx.executeSql('CREATE TABLE IF NOT EXISTS tailor_details (id integer primary key autoincrement, server_td_id integer, first_name text, middle_name text, last_name text, business_title text, address1 text, address2 text, email text, contact1 text, contact2 text, secret_key text, tailor_status integer, city text, pincode text, state_id integer, country_id integer, state_name text, country_name text, update_timestamp text, enable_img_download text)');
	tx.executeSql('CREATE TABLE IF NOT EXISTS static_details (id integer primary key autoincrement, server_sd_id integer, name text, identifier text, data text, update_timestamp text)');
	tx.executeSql('CREATE TABLE IF NOT EXISTS attr_images (id integer primary key autoincrement, attr_id integer, server_img_id integer, name text, image text, status text, sort_order text, download_status integer, update_timestamp text)');
	tx.executeSql('CREATE TABLE IF NOT EXISTS gallery_images (id integer primary key autoincrement, prod_id integer, server_gall_id integer, image text, download_status integer, update_timestamp text)');
}

// Common Transaction success callback
function successCB() {
	//alert('db transcation success');
	//console.log('db transcation success');
	loadDataFromServer();
}
//Transaction error callback
function errorCB(err) {
	hideModal();
	//alert("Error processing SQL: "+err.code);
	console.log("Error processing SQL: "+err.code);
}

// INSERT FUNCTIONS LIST
// Tailor Details
// Menu Categories
// Product List
// Product Attributes
// Product Measurements Fields

// UPDATE FUNCTIONS LIST
// Tailor Details
// Menu Categories
// Product List
// Product Attributes
// Product Measurements Fields

// Customer Details
// Orders Details


function insertTailorDetailsDetails(tx) {
	var currDateTimestamp="";
	currDateTimestamp=dateTimestamp();
	tx.executeSql('CREATE TABLE IF NOT EXISTS tailor_details (id integer primary key autoincrement, server_td_id integer, first_name text, middle_name text, last_name text, business_title text, address1 text, address2 text, email text, contact1 text, contact2 text, secret_key text, tailor_status integer, city text, pincode text, state_id integer, country_id integer, state_name text, country_name text, update_timestamp text, enable_img_download text)');
	//console.log('insertTailorDetailsDetails tailorDetailsJsonData '+tailorDetailsJsonData);	
	var jsonTempData = tailorDetailsJsonData;
	var tailor_details_id = jsonTempData["id"];
	var first_name = jsonTempData["first_name"];
	var last_name = jsonTempData["last_name"];
	var middle_name = jsonTempData["middle_name"];
	var business_title = jsonTempData["business_title"];
	var address1 = jsonTempData["address1"];
	var address2 = jsonTempData["address2"];
	var tailemail = jsonTempData["email"];
	var contact1 = jsonTempData["contact1"];
	var contact2 = jsonTempData["contact2"];
	var secret_key = jsonTempData["secret_key"];
	var tailor_status = jsonTempData["status"];
	var city = jsonTempData["city"];
	var pincode = jsonTempData["pincode"];
	var state_id = jsonTempData["state_id"];
	var country_id = jsonTempData["country_id"];
	var state_name = jsonTempData["state_name"];
	var country_name = jsonTempData["country_name"];
	var enable_img_download = jsonTempData['enable_img_download'];
	var update_timestamp = currDateTimestamp;
	
	tx.executeSql('select * from tailor_details' ,[],function(tx,results){
		var len = 0;
		len = results.rows.length;
		if(len > 0){
			tx.executeSql("UPDATE tailor_details SET enable_img_download = '" + enable_img_download + "', update_timestamp = '"+update_timestamp+"' WHERE server_td_id = " + tailor_details_id + "");
		}else{
			tx.executeSql('INSERT INTO tailor_details(server_td_id, first_name, middle_name, last_name, business_title, address1, address2, email, contact1, contact2, secret_key, tailor_status, city, pincode, state_id, country_id, state_name, country_name, update_timestamp, enable_img_download) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
   	    			[tailor_details_id, first_name,last_name, middle_name, business_title, address1, address2, tailemail, contact1, contact2, secret_key, tailor_status, city, pincode, state_id, country_id, state_name, country_name, update_timestamp, enable_img_download], function(tx, res) {
			});
		}
	});
}

function getTailorDetailsFromLocal(){
	if(testingInBrowser){
		var tailorDetailsObj={};
		tailorDetailsObj.id = 1;
		tailorDetailsObj.tailor_details_id = 1;
		tailorDetailsObj.first_name = "First_name";
		tailorDetailsObj.last_name = "Last_Name";
		tailorDetailsObj.middle_name = "Middle_name";
		tailorDetailsObj.business_title = "Business Title";
		tailorDetailsObj.address1 = "address1";
		tailorDetailsObj.address2 = "address2";
		tailorDetailsObj.tailemail = "emailId@email.com";
		tailorDetailsObj.contact1 = "9999999999";
		tailorDetailsObj.contact2 = "9999999999";
		tailorDetailsObj.secret_key = "dev12345";
		tailorDetailsObj.tailor_status = 1;
		tailorDetailsObj.city = "Bangalore";
		tailorDetailsObj.pincode = "789456";
		tailorDetailsObj.state_id = "2";
		tailorDetailsObj.country_id = "1";
		tailorDetailsObj.state_name = "Maharastra";
		tailorDetailsObj.country_name = "India";
		tailorDetailsObj.update_timestamp = "1";
		tailorDetailsObj.enable_img_download = "true";
		tailorDetailsSession = tailorDetailsObj;
		var firstName = tailorDetailsSession.first_name;
		var lastName = tailorDetailsSession.last_name;
		var middleName = tailorDetailsSession.middle_name;
		$('#tailorFullName').text(firstName +' '+ lastName +' '+ middleName);
		var tailorSecretKey = tailorDetailsSession.secret_key;
		$('#tailorSecretKey').text(tailorSecretKey);
		if(tailorDetailsSession.enable_img_download == "0"){
			$('#downloadEnable').show();
		}else{
			$('#downloadEnable').hide();
		}
		getCategoriesListFromLocal();
		return;
	}
	
	db.transaction(	function (tx){
		tx.executeSql('CREATE TABLE IF NOT EXISTS tailor_details (id integer primary key autoincrement, server_td_id integer, first_name text, middle_name text, last_name text, business_title text, address1 text, address2 text, email text, contact1 text, contact2 text, secret_key text, tailor_status integer, city text, pincode text, state_id integer, country_id integer, state_name text, country_name text, update_timestamp text, enable_img_download text)');
		var len = 0;
			tx.executeSql('select * from tailor_details ',[],function(tx,results){
					len = results.rows.length;
					if(len>0){
						tailorDetailsSession = {};
						for (var i = 0; i < len; i++) {
							var tailorDetailsObj={};
							tailorDetailsObj.id = results.rows.item(i)['id'];
							tailorDetailsObj.tailor_details_id = results.rows.item(i)['server_td_id'];
							tailorDetailsObj.first_name = results.rows.item(i)['first_name'];
							tailorDetailsObj.last_name = results.rows.item(i)['last_name'];
							tailorDetailsObj.middle_name = results.rows.item(i)['middle_name'];
							tailorDetailsObj.business_title = results.rows.item(i)['business_title'];
							tailorDetailsObj.address1 = results.rows.item(i)['address1'];
							tailorDetailsObj.address2 = results.rows.item(i)['address2'];
							tailorDetailsObj.tailemail = results.rows.item(i)['tailemail'];
							tailorDetailsObj.contact1 = results.rows.item(i)['contact1'];
							tailorDetailsObj.contact2 = results.rows.item(i)['contact2'];
							tailorDetailsObj.secret_key = results.rows.item(i)['secret_key'];
							tailorDetailsObj.tailor_status = results.rows.item(i)['tailor_status'];
							tailorDetailsObj.city = results.rows.item(i)['city'];
							tailorDetailsObj.pincode = results.rows.item(i)['pincode'];
							tailorDetailsObj.state_id = results.rows.item(i)['state_id'];
							tailorDetailsObj.country_id = results.rows.item(i)['country_id'];
							tailorDetailsObj.state_name = results.rows.item(i)['state_name'];
							tailorDetailsObj.country_name = results.rows.item(i)['country_name'];
							tailorDetailsObj.update_timestamp = results.rows.item(i)['update_timestamp'];
							tailorDetailsObj.enable_img_download = results.rows.item(i)['enable_img_download'];
							tailorDetailsSession = tailorDetailsObj;
						}
					}
				}, errorCB
			);
		},errorCBTailorDetailsListDB,successCBTailorDetailsListDB
	);
}

function successCBTailorDetailsListDB() {
	var firstName = tailorDetailsSession.first_name;
	var lastName = tailorDetailsSession.last_name;
	var middleName = tailorDetailsSession.middle_name;
	$('#tailorFullName').text(firstName +' '+ lastName +' '+ middleName);
	var tailorSecretKey = tailorDetailsSession.secret_key;
	$('#tailorSecretKey').text(tailorSecretKey);
	connectionType = checkConnection();
	if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
		if(syncTailorDetails == false){
			loginUserId = tailorDetailsSession.secret_key;
			getTailorDetailsDataFromServer();
			syncTailorDetails = true;
		}else{
			if(tailorDetailsSession.enable_img_download == "0"){
				$('#downloadEnable').show();
			}else{
				$('#downloadEnable').hide();
			}
			console.log('Tailor Details successfully got');
			deleteRecordStatus = 0;
			checkCategoryInLocalDB();
		}
	}else{
		checkCategoryInLocalDB();
	}
}	

function errorCBTailorDetailsListDB(err) {
	hideModal();
	console.log("errorCBTailorDetailsListDB "+err.message);
}


function insertCategories(arrData) {
	db.transaction(function(tx) {
		var currDateTimestamp="";
		currDateTimestamp=dateTimestamp();
		tx.executeSql('CREATE TABLE IF NOT EXISTS category(id integer primary key autoincrement, server_cat_id integer, parent_id integer,name text,update_timestamp text, description text, catImage text, catStatus integer, children text, sort_order text)');
		
		jQuery.each(arrData, function(index,value) {
			var server_cat_id = value['id'];
			var name = value.name;
			var parent_id = value.parent_id;
			var description = value.description;
			var catImage = value["image"];
			var catStatus = value["status"];
			var update_timestamp=currDateTimestamp;
			var childrenArrString = '';
			var childrenArr = value.children;    
			var sort_order = value['sort_order'];
			var childExist = '0';
			if(childrenArr != ''){
				childExist = '1';
			}
			
			tx.executeSql('select * from category where server_cat_id ='+server_cat_id ,[],function(tx,results){
				var len = 0;
				len = results.rows.length;
				//console.log('len'+len);
				if(len > 0){
					for (var i = 0; i < len; i++) {
						var localDB_id = results.rows.item(i)['id'];
						var localDB_server_cat_id=results.rows.item(i)['server_cat_id'];
						var localDB_parent_id=results.rows.item(i)['parent_id'];
						var localDB_name=results.rows.item(i)['name'];
						var localDB_sortOrder = results.rows.item(i)['sort_order'];
						//console.log('localDB_server_cat_id : '+ localDB_server_cat_id);
						//console.log('localDB_name : '+ localDB_name);
						if(name != ''){
							localDB_name = name;
						}
						var localDB_description=results.rows.item(i)['description'];
						if(description != ''){
							localDB_description = description;
						}
						var localDB_catStatus = results.rows.item(i)['catStatus'];
						if(catStatus != ''){
							localDB_catStatus = catStatus;
						}
						var localDB_catImage = results.rows.item(i)['catImage'];
						if(catImage != ''){
							localDB_catImage = catImage;
						}
						//if(sort_order != ''){
							localDB_sortOrder = sort_order;
						//}
						//console.log('update');
						tx.executeSql("UPDATE category SET name = '" + localDB_name + "', description = '" + localDB_description + "', update_timestamp = '"+update_timestamp+"', catImage ='"+localDB_catImage+"', catStatus ='"+localDB_catStatus+"', sort_order = '"+localDB_sortOrder+"' WHERE id = " + localDB_id + "");
					}
				}else{
					//console.log('insert');
					tx.executeSql('INSERT INTO category(server_cat_id, parent_id, name, update_timestamp, description, catImage, catStatus, children, sort_order) VALUES (?,?,?,?,?,?,?,?,?)',
							[server_cat_id, parent_id, name, update_timestamp,description, catImage, catStatus, childExist, sort_order], function(tx, res) {
					//console.log(' Parent Category ');
				});
				}
			});
			
			if(childExist == '1'){
				jQuery.each(childrenArr, function(index1,value1) { 
					var server_cat_id_child = value1['id'];
					var name_child = value1.name;
					var parent_id_child = value1.parent_id;
					var description_child = value1.description;
					var catImage_child = value1["image"];
					var catStatus_child = value1["status"];
					var sort_order_child = value1['sort_order']; 
			
					tx.executeSql('select * from category where server_cat_id ='+server_cat_id_child ,[],function(tx,results){
						var len = 0;
						len = results.rows.length;
						if(len > 0){
							for (var i = 0; i < len; i++) {
								var localDB_id = results.rows.item(i)['id'];
								var localDB_server_cat_id=results.rows.item(i)['server_cat_id'];
								var localDB_parent_id=results.rows.item(i)['parent_id'];
								if(parent_id_child != ''){
									localDB_parent_id = parent_id_child;
								}
								var localDB_name=results.rows.item(i)['name'];
								if(name != ''){
									localDB_name = name_child;
								}
								var localDB_description=results.rows.item(i)['description'];
								if(description != ''){
									localDB_description = description_child;
								}
								var localDB_catImage = results.rows.item(i)['catImage'];
								if(catImage_child != ''){
									localDB_catImage = catImage_child;
								}
								var localDB_catStatus = results.rows.item(i)['catStatus'];
								if(catStatus_child != ''){
									localDB_catStatus = catStatus_child;
								}
								var localDB_sort_order = results.rows.item(i)['sort_order'];
								localDB_sort_order = sort_order_child;
								//console.log('update Child');
								tx.executeSql("UPDATE category SET name = '" + localDB_name + "', description = '" + localDB_description + "', update_timestamp = '"+update_timestamp+"', catImage ='"+localDB_catImage+"', catStatus ='"+localDB_catStatus+"', parent_id = "+localDB_parent_id+", sort_order = '"+localDB_sort_order+"' WHERE id = " + localDB_id + "");
							}
						}else{
							//console.log('insert Child');
							tx.executeSql('INSERT INTO category(server_cat_id, parent_id, name, update_timestamp, description, catImage, catStatus, children, sort_order) VALUES (?,?,?,?,?,?,?,?,?)',
									[server_cat_id_child, parent_id_child, name_child, update_timestamp,description_child, catImage_child, catStatus_child, childrenArrString, sort_order_child], function(tx, res) {
								//alert(server_cat_id_child, parent_id_child, name_child);
								//console.log(' Child Category ');
							});	
						}
					});
					
				});
			}
		});
	},errorCBInsertCategories, successCBInsertCategories);
}

function successCBInsertCategories() {
	//console.log(' category Successfully Inserted ');
	dataHasSyncSendReport('categories_sync');
	var productDiv = '';
	if(dataExist){
		productDiv = '<p> Product Data Syncing </p>';
	}else{
		productDiv = '<p>Product Data First Time Syncing</p>';
	}
	$('.appendStatusDiv').append(productDiv);
	getProductDataFromServer();
}	

function errorCBInsertCategories(err) {
	hideModal();
	console.log("errorCBInsertCategories : "+ err.message);
}

function getCategoriesListFromLocal(){
	if(testingInBrowser){
		var catArrSessionData='[{"id":1,"server_cat_id":1,"parent_id":"","name":"Men","description":"","image":"","sort_order":"1","status":"1"}, {"id":1,"server_cat_id":4,"parent_id":"","name":"Women","description":"","image":"","sort_order":"1","status":"1"}, {"id":1,"server_cat_id":7,"parent_id":"","name":"Kids","description":"","image":"","sort_order":"1","status":"1"}]';
		catArrSession=jQuery.parseJSON(catArrSessionData);
		var subCatArrSessionData='[{"id":2,"server_cat_id":2,"parent_id":"1","name":"SHIRT","description":"description02","image":"","sort_order":"1","status":"1"},{"id":3,"server_cat_id":3,"parent_id":"1","name":"PANT","description":"description03","image":"","sort_order":"2","status":"1"},{"id":2,"server_cat_id":5,"parent_id":"4","name":"KURTA","description":"description02","image":"","sort_order":"1","status":"1"},{"id":3,"server_cat_id":6,"parent_id":"4","name":"SKUT","description":"description03","image":"","sort_order":"2","status":"1"},{"id":2,"server_cat_id":8,"parent_id":"7","name":"T-Shirt","description":"description02","image":"","sort_order":"1","status":"1"},{"id":3,"server_cat_id":9,"parent_id":"7","name":"Chaddi","description":"description03","image":"","sort_order":"2","status":"1"}]';
		subCatArrSession=jQuery.parseJSON(subCatArrSessionData);
		appendCatListDB(catArrSession, subCatArrSession);
		return;
	}
	
	var categoryRecordsDiv = '';
	categoryRecordsDiv = '<p> Retrieving Category Records From Database </p>';
	$('.appendStatusDiv').append(categoryRecordsDiv);
	db.transaction(	function (tx){
		//console.log('getCategoriesListFromLocal');
			tx.executeSql('select * from category ORDER BY sort_order ASC',[],function(tx,results){
					var len = results.rows.length;
					if(len>0){
						catArrSession=[];
						subCatArrSession=[];
						for (var i = 0; i < len; i++) {
							var jsonObj={};
							jsonObj.id=results.rows.item(i)['id'];
							jsonObj.server_cat_id=results.rows.item(i)['server_cat_id'];
							jsonObj.parent_id=results.rows.item(i)['parent_id'];
							jsonObj.name=results.rows.item(i)['name'];
							jsonObj.description=results.rows.item(i)['description'];
							jsonObj.children=results.rows.item(i)['children'];
							jsonObj.sort_order = results.rows.item(i)['sort_order'];
							
							if(jsonObj.parent_id !=''){
								subCatArrSession.push(jsonObj);
							}else{
								catArrSession.push(jsonObj);
							}
						}
						console.log('Category successfully got');
					}
				}, errorCB
			);
		},errorCBCatListDB,successCBCatListDB
	);
}

function successCBCatListDB() {
	var categoryAppendingRecordsDiv = '';
	categoryAppendingRecordsDiv = '<p> Appending Category Records </p>';
	$('.appendStatusDiv').append(categoryAppendingRecordsDiv);
	
	appendCatListDB(catArrSession, subCatArrSession);
	//getStaticListFromLocal();
}	

function errorCBCatListDB(err) {
	hideModal();
	console.log("errorCBCatListDB : "+err.message);
}

function successCBCatLocalDB() {
	//console.log("successCBCatLocalDB");
}	

function errorCBCatLocalDB(err) {
	hideModal();
	console.log("errorCBCatLocalDB : "+err.message);
}

function successCBSubCatListDB() {
	appendSubCatListDB(subCatArrSession);
}	

function errorCBSubCatListDB(err) {
	hideModal();
	console.log("errorCBSubCatListDB : "+err.message);
}

function insertProductDetails(tx) {
	var currDateTimestamp="";
	currDateTimestamp=dateTimestamp();
	tx.executeSql('CREATE TABLE IF NOT EXISTS product_details (id integer primary key autoincrement, server_prod_id integer, name text, description text, update_timestamp text, measurement_typeid integer, status integer, attribute_details text, gallery text, category text)');
	
	jQuery.each(productJsonData, function(index,value) {
		var server_prod_id = value['id'];
		var name = value['name'];
		var description = value['description'];
		var attributeJson = JSON.stringify(value['attributes']);
		var prod_status = value['status'];
		var measurement_typeid = value['measurement_typeid'];
		var update_timestamp = currDateTimestamp;
		var categoryJson = JSON.stringify(value['category']);
		var galleryJson = JSON.stringify(value['gallary']);
		
		tx.executeSql('select * from product_details where server_prod_id ='+server_prod_id ,[],function(tx,results){
			var len = 0;
			len = results.rows.length;
			if(len > 0){
				for (var i = 0; i < len; i++) {
					var localDB_id = results.rows.item(i)['id'];
					var localDB_server_prod_id=results.rows.item(i)['server_prod_id'];
					var localDB_name=results.rows.item(i)['name'];
					if(name != ''){
						localDB_name = name;
					}
					var localDB_description=results.rows.item(i)['description'];
					if(description != ''){
						localDB_description = description;
					}
					var local_DB_attributeJson = results.rows.item(i)['attribute_details'];
					if(attributeJson != ''){
						local_DB_attributeJson = attributeJson;
					}
					var local_DB_prod_status = results.rows.item(i)['status'];
					if(prod_status != ''){
						local_DB_prod_status = prod_status;
					}
					var local_DB_measurement_typeid = results.rows.item(i)['measurement_typeid'];
					if(measurement_typeid != ''){
						local_DB_measurement_typeid = measurement_typeid;
					}
					var local_DB_gallery = results.rows.item(i)['gallery'];
					if(galleryJson != ''){
						local_DB_gallery =  galleryJson;
					}
					var local_DB_category = results.rows.item(i)['category'];
					if(galleryJson != ''){
						local_DB_category =  categoryJson;
					}
					//console.log('update product');
					tx.executeSql("UPDATE product_details SET name = '" + localDB_name + "', description = '" + localDB_description + "', update_timestamp = '"+update_timestamp+"', attribute_details = '"+local_DB_attributeJson+"', status = "+local_DB_prod_status+", measurement_typeid = "+local_DB_measurement_typeid+", gallery = '"+local_DB_gallery+"', category = '"+local_DB_category+"' WHERE id = " + localDB_id + "");
				}
				
			}else{
				//console.log('insert product');
				tx.executeSql('INSERT INTO product_details (server_prod_id, name, description, update_timestamp, measurement_typeid, status, attribute_details, gallery, category) VALUES (?,?,?,?,?,?,?,?,?)',
	   	    			[server_prod_id, name, description, update_timestamp, measurement_typeid, prod_status, attributeJson, galleryJson, categoryJson], function(tx, res) {
				//console.log("PD insertId: " + res.insertId );
				});
			}
		});
	});
}

function successCBProdListDB() {
	if(connectionType=="Unknown connection" || connectionType=="No network connection"){
		appendProdListDB(productDetailsArrSession);
	}
	else if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
		getAttributeListFromLocal();
	}
}	

function errorCBProdListDB(err) {
	hideModal();
	console.log("errorCBProdListDB : "+err.message);
}

function successCBProdLocalDB() {
	//console.log("successCBProdLocalDB");
}	

function errorCBProdLocalDB(err) {
	hideModal();
	console.log("errorCBProdLocalDB : "+err.message);
}

function successCBInsertProductDetails() {
	dataHasSyncSendReport('products_sync');
	var attributeDiv = '';
	window.localStorage["productimgflag"] = 0;
	if(dataExist){
		attributeDiv = '<p> Attribute Data Syncing </p>';
	}else{
		attributeDiv = '<p> Attribute Data First Time Syncing </p>';
	}
	$('.appendStatusDiv').append(attributeDiv);
	 getAttributesDataFromServer();
}

function errorCBInsertProductDetails(err) {
	hideModal();
	console.log("errorCBInsertProductDetails : "+err.message);
}

var appendCount=1;
function getProductsListFromLocal(){
	if(testingInBrowser){
		if(appendCount==1){
			appendCount=2;
		}
		
		var myArr= new Array();
		var myObject = new Object();
		myObject.id = 1;
		myObject.server_prod_id = 1;
		myObject.prod_name = "SHIRT - FULL SLEEVE";
		myObject.prod_description = "Fabric: Cotton Linen Blend Slim Fit, Full Sleeve Collar Type: Regular Pattern: Checkered Set of 1";
		myObject.measurement_typeid = "1";
		myObject.prod_status = "1";
		myObject.attribute_details = '[{"id":59,"pdt_id":"1","attr_id":"1","created_at":"2016-11-21 06:02:58","updated_at":"2016-11-21 06:02:58"}, {"id":59,"pdt_id":"1","attr_id":"2","created_at":"2016-11-21 06:02:58","updated_at":"2016-11-21 06:02:58"},{"id":59,"pdt_id":"1","attr_id":"1","created_at":"2016-11-21 06:02:58","updated_at":"2016-11-21 06:02:58"}, {"id":59,"pdt_id":"1","attr_id":"2","created_at":"2016-11-21 06:02:58","updated_at":"2016-11-21 06:02:58"},{"id":59,"pdt_id":"1","attr_id":"4","created_at":"2016-11-21 06:02:58","updated_at":"2016-11-21 06:02:58"}, {"id":59,"pdt_id":"1","attr_id":"3","created_at":"2016-11-21 06:02:58","updated_at":"2016-11-21 06:02:58"}]';
		myObject.category = '[{"id":40,"pdt_id":"1","cat_id":"1","created_at":"2016-11-21 06:02:58","updated_at":"2016-11-21 06:02:58"}]';
		myObject.gallery = '[{"id":9,"pdt_id":"1","image":"product_5_582ea8c053c3b.jpg","created_at":"2016-11-18 07:07:44","updated_at":"2016-11-18 07:07:44"}]';
			
		myArr.push(myObject);
		
		var myObject = new Object();
		myObject.id = 1;
		myObject.server_prod_id = 2;
		myObject.prod_name = "SHIRT - FULL PANT";
		myObject.prod_description = "Fabric: Woolan Blend Slim Fit Checkered Set of 1";
		myObject.measurement_typeid = "1";
		myObject.prod_status = "1";
		myObject.attribute_details = '[{"id":59,"pdt_id":"2","attr_id":"3","created_at":"2016-11-21 06:02:58","updated_at":"2016-11-21 06:02:58"}, {"id":59,"pdt_id":"2","attr_id":"4","created_at":"2016-11-21 06:02:58","updated_at":"2016-11-21 06:02:58"},{"id":59,"pdt_id":"2","attr_id":"2","created_at":"2016-11-21 06:02:58","updated_at":"2016-11-21 06:02:58"}, {"id":59,"pdt_id":"2","attr_id":"1","created_at":"2016-11-21 06:02:58","updated_at":"2016-11-21 06:02:58"}]';
		myObject.category = '[{"id":40,"pdt_id":"2","cat_id":"3","created_at":"2016-11-21 06:02:58","updated_at":"2016-11-21 06:02:58"}]';
		myObject.gallery = '[{"id":8,"pdt_id":"2","image":"product_5_582ea8c053c3b.jpg","created_at":"2016-11-18 07:07:44","updated_at":"2016-11-18 07:07:44"}]';
			
		myArr.push(myObject);
		
		var myObject = new Object();
		myObject.id = 1;
		myObject.server_prod_id = 3;
		myObject.prod_name = "Women - Kurta";
		myObject.prod_description = "Fabric: Cotton Linen Blend Slim Fit, Full Sleeve Collar Type: Regular Pattern: Checkered Set of 1";
		myObject.measurement_typeid = "1";
		myObject.prod_status = "1";
		myObject.attribute_details = '[{"id":59,"pdt_id":"3","attr_id":"5","created_at":"2016-11-21 06:02:58","updated_at":"2016-11-21 06:02:58"}, {"id":59,"pdt_id":"3","attr_id":"6","created_at":"2016-11-21 06:02:58","updated_at":"2016-11-21 06:02:58"}]';
		myObject.category = '[{"id":40,"pdt_id":"3","cat_id":"5","created_at":"2016-11-21 06:02:58","updated_at":"2016-11-21 06:02:58"}]';
		myObject.gallery = '[{"id":9,"pdt_id":"3","image":"product_5_582ea8c053c3b.jpg","created_at":"2016-11-18 07:07:44","updated_at":"2016-11-18 07:07:44"}, {"id":11,"pdt_id":"3","image":"product_5_582ea8c053c3b.jpg","created_at":"2016-11-18 07:07:44","updated_at":"2016-11-18 07:07:44"}, {"id":10,"pdt_id":"3","image":"product_5_582ea8c053c3b.jpg","created_at":"2016-11-18 07:07:44","updated_at":"2016-11-18 07:07:44"}]';
			
		myArr.push(myObject);
		
		var myObject = new Object();
		myObject.id = 1;
		myObject.server_prod_id = 4;
		myObject.prod_name = "SHIRT - FULL PANT";
		myObject.prod_description = "Fabric: Woolan Blend Slim Fit Checkered Set of 1";
		myObject.measurement_typeid = "1";
		myObject.prod_status = "1";
		myObject.attribute_details = '[{"id":59,"pdt_id":"4","attr_id":"7","created_at":"2016-11-21 06:02:58","updated_at":"2016-11-21 06:02:58"}, {"id":59,"pdt_id":"4","attr_id":"8","created_at":"2016-11-21 06:02:58","updated_at":"2016-11-21 06:02:58"}]';
		myObject.category = '[{"id":40,"pdt_id":"4","cat_id":"9","created_at":"2016-11-21 06:02:58","updated_at":"2016-11-21 06:02:58"}]';
		myObject.gallery = '[{"id":8,"pdt_id":"4","image":"product_5_582ea8c053c3b.jpg","created_at":"2016-11-18 07:07:44","updated_at":"2016-11-18 07:07:44"}]';
			
		myArr.push(myObject);
		productDetailsArrSession=myArr;
		
		appendProdListDB(productDetailsArrSession);
		return;
	}
	var productRecordsDiv = '';
	productRecordsDiv = '<p> Retrieving Product Records From Database </p>';
	$('.appendStatusDiv').append(productRecordsDiv);
	db.transaction(	function (tx){
			tx.executeSql('select * from product_details ',[],function(tx,results){
					var len = results.rows.length;
					productDetailsArrSession = [];
					if(len>0){
						for (var i = 0; i < len; i++) {
							var jsonObj={};
							jsonObj['id'] = results.rows.item(i)['id'];
							jsonObj['server_prod_id'] = results.rows.item(i)['server_prod_id'];
							jsonObj['prod_name'] = results.rows.item(i)['name'];
							jsonObj['prod_description'] = results.rows.item(i)['description'];
							jsonObj['measurement_typeid'] = results.rows.item(i)['measurement_typeid'];
							jsonObj['prod_status'] = results.rows.item(i)['status'];
							jsonObj['attribute_details'] = results.rows.item(i)['attribute_details'];
							jsonObj['gallery'] = results.rows.item(i)['gallery'];
							jsonObj['category'] = results.rows.item(i)['category'];
							productDetailsArrSession.push(jsonObj);
						}
					}
				}, errorCB
			);
		},errorCBProdListDB,successCBProdListDB
	);
}

function insertAttributesDetails(tx) {
	var currDateTimestamp="";
	currDateTimestamp=dateTimestamp();
	tx.executeSql('CREATE TABLE IF NOT EXISTS product_attributes (id integer primary key autoincrement, server_attr_id integer, name text, identifier text, status integer, backend_name text, update_timestamp text, option text)');
	
	jQuery.each(attributeJsonData, function(index,value) {
		var server_attr_id = value['id'];
		var name = value['name'];
		var identifier = value['identifier'];
		var attr_status = value['status'];
		var backend_name = value['backend_name'];
		var optionJson = JSON.stringify(value['option']);
		var update_timestamp = currDateTimestamp;
		
		tx.executeSql('select * from product_attributes where server_attr_id ='+server_attr_id ,[],function(tx,results){
			var len = 0;
			len = results.rows.length;
			if(len > 0){
				for (var i = 0; i < len; i++) {
					var localDB_id = results.rows.item(i)['id'];
					var localDB_server_attr_id=results.rows.item(i)['server_attr_id'];
					var localDB_name=results.rows.item(i)['name'];
					if(name != ''){
						localDB_name = name;
					}
					var localDB_identifier=results.rows.item(i)['identifier'];
					if(name != ''){
						localDB_identifier = identifier;
					}
					var local_DB_status = results.rows.item(i)['status'];
					if(attr_status != ''){
						local_DB_status = attr_status;
					}
					var local_DB_backend_name = results.rows.item(i)['backend_name'];
					if(backend_name != ''){
						local_DB_backend_name =  backend_name;
					}
					var local_DB_option = results.rows.item(i)['option'];
					if(optionJson != ''){
						local_DB_option = optionJson;
					}
					//console.log('update product_attributes');
					tx.executeSql("UPDATE product_attributes SET name = '" + localDB_name + "', identifier = '" + localDB_identifier + "', update_timestamp = '"+update_timestamp+"', status = "+local_DB_status+", backend_name = '"+local_DB_backend_name+"', option = '"+local_DB_option+"' WHERE id = " + localDB_id + "");
				}
				
			}else{
				//console.log('insert product_attributes');
				tx.executeSql('INSERT INTO product_attributes(server_attr_id, name, identifier, status, backend_name, update_timestamp, option) VALUES (?,?,?,?,?,?,?)',
	   	    			[server_attr_id, name,identifier, attr_status, backend_name, update_timestamp, optionJson], function(tx, res) {
		   	        	//console.log("Attribute Data insertId: " + res.insertId + " -- res.rowsAffected 1"+res.rowsAffected);
				});
			}
		});
		
		
	});
}

function insertAttrImagesDetails(tx) {
	var currDateTimestamp="";
	currDateTimestamp=dateTimestamp();
	tx.executeSql('CREATE TABLE IF NOT EXISTS attr_images (id integer primary key autoincrement, attr_id integer, server_img_id integer, name text, image text, status text, sort_order text, download_status integer, update_timestamp text)');
	
	tx.executeSql('select * from attr_images ' ,[],function(tx,results){
		var len = 0;
		len = results.rows.length;
		if(len >= 0){
			if(len < attributeImageJsonData.length){
				jQuery.each(attributeImageJsonData, function(index,value) {
					var server_img_id = value['id'];
					var name = value['name'];
					var attr_id = value['attr_id'];
					var image = value['image'];
					var image_status = value['status'];
					var sort_order = value['sort_order'];
					var downloadStatus = 0;
					
					var update_timestamp = currDateTimestamp;
					
					tx.executeSql('select * from attr_images where server_img_id ='+server_img_id ,[],function(tx,results){
						var len = 0;
						len = results.rows.length;
						if(len > 0){
							for (var i = 0; i < len; i++) {
								var localDB_id = results.rows.item(i)['id'];
								var localDB_server_img_id=results.rows.item(i)['server_img_id'];
								var localDB_name=results.rows.item(i)['name'];
								if(name != ''){
									localDB_name = name;
								}
								var localDB_attr_id=results.rows.item(i)['attr_id'];
								if(attr_id != ''){
									localDB_attr_id = attr_id;
								}
								var local_DB_image = results.rows.item(i)['image'];
								/*if(image != ''){
									local_DB_image = image;
								}*/
								/*var local_DB_statusImage = results.rows.item(i)['status'];
								if(image_status != ''){
									local_DB_statusImage =  image_status;
								}
								var local_DB_sort_order = results.rows.item(i)['sort_order'];
								if(sort_order != ''){
									local_DB_sort_order = sort_order;
								}*/
								local_DB_download_status = 0;
								//console.log('update product_attributes');
								if(image != local_DB_image){
									local_DB_image = image;
									tx.executeSql("UPDATE attr_images SET update_timestamp = '"+update_timestamp+"', image = "+local_DB_image+", download_status = 0 WHERE id = " + localDB_id + "");
								}
								//tx.executeSql("UPDATE attr_images SET name = '" + localDB_name + "', attr_id = '" + localDB_attr_id + "', update_timestamp = '"+update_timestamp+"', image = "+local_DB_image+", status = '"+local_DB_statusImage+"', sort_order = '"+local_DB_sort_order+"', download_status = 0 WHERE id = " + localDB_id + "");
							}
						}else{
							//console.log('insert product_attributes');
							tx.executeSql('INSERT INTO attr_images(attr_id, server_img_id, name, image, status, sort_order, download_status, update_timestamp) VALUES (?,?,?,?,?,?,?,?)',
				   	    			[attr_id, server_img_id, name,image, image_status, sort_order, downloadStatus, update_timestamp], function(tx, res) {
					   	        	console.log("Attribute Images Data insertId: " + res.insertId + " -- res.rowsAffected 1"+res.rowsAffected);
							});
						}
					});
					
					
				});
			}else{
				alert('No data exist in server');
			}
		}
	});
	
	
}

function insertGalleryImagesDetails(tx) {
	var currDateTimestamp="";
	currDateTimestamp=dateTimestamp();
	tx.executeSql('CREATE TABLE IF NOT EXISTS gallery_images (id integer primary key autoincrement, prod_id integer, server_gall_id integer, image text, download_status integer, update_timestamp text)');
	
	tx.executeSql('select * from gallery_images ' ,[],function(tx,results){
		var len = 0;
		len = results.rows.length;
		if(len >= 0){
			console.log(len + " len < galleryImageJsonData.length " + galleryImageJsonData.length);
			if(len < galleryImageJsonData.length){
				jQuery.each(galleryImageJsonData, function(index,value) {
					var server_gall_id = value['id'];
					var prod_id = value['pdt_id'];
					var image = value['image'];
					var downloadStatus = 0;
					var update_timestamp = currDateTimestamp;
					
					tx.executeSql('select * from gallery_images where server_gall_id ='+server_gall_id ,[],function(tx,results){
						var len = 0;
						len = results.rows.length;
						if(len > 0){
							for (var i = 0; i < len; i++) {
								var localDB_id = results.rows.item(i)['id'];
								var localDB_server_gall_id=results.rows.item(i)['server_gall_id'];
								/*var localDB_prod_id=results.rows.item(i)['prod_id'];
								if(prod_id != ''){
									localDB_prod_id = prod_id;
								}*/
								var local_DB_image = results.rows.item(i)['image'];
								/*if(image != ''){
									local_DB_image = image;
								}*/
								if(image != local_DB_image){
									local_DB_image = image;
									tx.executeSql("UPDATE gallery_images SET image = '" + local_DB_image + "', update_timestamp = '"+update_timestamp+"', download_status = 0 WHERE id = " + localDB_id + "");
								}
								//tx.executeSql("UPDATE gallery_images SET image = '" + local_DB_image + "', prod_id = '" + localDB_prod_id + "', update_timestamp = '"+update_timestamp+"', download_status = 0 WHERE id = " + localDB_id + "");
							}
							
						}else{
							//console.log('insert product_attributes');
							//id integer primary key autoincrement, prod_id integer, server_gall_id integer, image text, download_status integer, update_timestamp text
							tx.executeSql('INSERT INTO gallery_images(prod_id, server_gall_id, image, download_status, update_timestamp) VALUES (?,?,?,?,?)',
				   	    			[prod_id, server_gall_id, image, downloadStatus, update_timestamp], function(tx, res) {
					   	        	console.log("Gallery Images Data insertId: " + res.insertId + " -- res.rowsAffected 1"+res.rowsAffected);
							});
						}
					});
				});
			}else{
				alert('No data exist in server');
			}
		}
	});
}

function successCBAttrListDB() {
	connectionType=checkConnection();
	
	if(connectionType=="Unknown connection" || connectionType=="No network connection"){
		//navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
	}
	else if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
		//downloadAttrOptionImages(attrDetailsArrSession);
		$('#buttonToGo').show();
		//showProdNamesInImgDownPage();
	}
}	

function errorCBAttrListDB(err) {
	hideModal();
	console.log("errorCBProdListDB : "+err.message);
}

function successCBInsertAttributeDetails() {
	dataHasSyncSendReport('attributes_sync');
	var measurementDiv = '';
	if(dataExist){
		measurementDiv = '<p> Measurement Data Syncing </p>';
	}else{
		measurementDiv = '<p> Measurement Data first time Syncing </p>';
	}
	
	$('.appendStatusDiv').append(measurementDiv);
	 getMeasurementsDataFromServer();
}	
function errorCBInsertAttributeDetails(err) {
	hideModal();
	console.log("errorCBInsertAttributeDetails : "+err.message);
}

function successCBInsertAttrImagesDetails() {
	$('#downloadAttrImg').show();	
	$('.labelAttrloader').html('Completed');
}	
function errorCBInsertAttrImagesDetails(err) {
	hideModal();
	console.log("errorCBInsertAttributeDetails : "+err.message);
}

function successCBInsertGalleryImagesDetails(){
	$('#downloadGalleryImg').show();	
	$('.labelGalleryloader').html('Completed');
}

function errorCBInsertGalleryImagesDetails(err) {
	hideModal();
	console.log("errorCBInsertGalleryImagesDetails : "+err.message);
}

function successCBAttrLocalDB() {
}	

function errorCBAttrLocalDB(err) {
	hideModal();
	console.log("errorCBAttrLocalDB : "+err.message);
}

function getAttributeListFromLocal(){
	if(testingInBrowser){
		var myArr= new Array();
		var myObject = new Object();
		myObject.id = 1;
		myObject.server_attr_id = 1;
		myObject.attr_name = "Attribute 1-shirt cuffs";
		myObject.identifier = "sss1";
		myObject.attr_status = "1";
		myObject.backend_name = "Backend shirt cuffs";
		myObject.option = '[{"id":1,"attr_id":"1","name":"a1-option1 cuffs1","image":"attribute_1_583285971f775.png","status":"1","sort_order":"0","created_at":"2016-11-02 19:40:34","updated_at":"2016-11-21 05:26:47"},{"id":2,"attr_id":"1","name":"a1-option2 cuffs2","image":"attribute_1_583285971fd42.png","status":"1","sort_order":"0","created_at":"2016-11-17 07:48:14","updated_at":"2016-11-21 05:26:47"},{"id":3,"attr_id":"1","name":"a1-option3 cuffs3","image":"attribute_1_58328597200e6.png","status":"1","sort_order":"0","created_at":"2016-11-21 05:26:47","updated_at":"2016-11-21 05:26:47"},{"id":4,"attr_id":"1","name":"a1-option4 cuffs4","image":"attribute_1_5832859720444.png","status":"1","sort_order":"0","created_at":"2016-11-21 05:26:47","updated_at":"2016-11-21 05:26:47"}]';
		
		myArr.push(myObject);
		
		var myObject = new Object();
		myObject.id = 2;
		myObject.server_attr_id = 2;
		myObject.attr_name = "Attribute 2-shirt Pocket";
		myObject.identifier = "sss2";
		myObject.attr_status = "1";
		myObject.backend_name = "shirt shirt Pocket";
		myObject.option = '[{"id":5,"attr_id":"2","name":"a2-option1 Pocket","image":"attribute_1_583285971f775.png","status":"1","sort_order":"0","created_at":"2016-11-02 19:40:34","updated_at":"2016-11-21 05:26:47"},{"id":6,"attr_id":"2","name":"a2-option2 Pocket","image":"attribute_1_583285971fd42.png","status":"1","sort_order":"0","created_at":"2016-11-17 07:48:14","updated_at":"2016-11-21 05:26:47"},{"id":7,"attr_id":"2","name":"a2-option3 Pocket","image":"attribute_1_58328597200e6.png","status":"1","sort_order":"0","created_at":"2016-11-21 05:26:47","updated_at":"2016-11-21 05:26:47"}]';
		myArr.push(myObject);
		
		var myObject = new Object();
		myObject.id = 2;
		myObject.server_attr_id = 3;
		myObject.attr_name = "Attribute 3-Pant Pocket";
		myObject.identifier = "pant1";
		myObject.attr_status = "1";
		myObject.backend_name = "Pant Pocket";
		myObject.option = '[{"id":8,"attr_id":"3","name":"a3-option1 Pocket","image":"attribute_1_583285971f775.png","status":"1","sort_order":"0","created_at":"2016-11-02 19:40:34","updated_at":"2016-11-21 05:26:47"},{"id":9,"attr_id":"3","name":"a3-option2 Pocket","image":"attribute_1_583285971fd42.png","status":"1","sort_order":"0","created_at":"2016-11-17 07:48:14","updated_at":"2016-11-21 05:26:47"},{"id":10,"attr_id":"3","name":"a3-option3 Pocket","image":"attribute_1_58328597200e6.png","status":"1","sort_order":"0","created_at":"2016-11-21 05:26:47","updated_at":"2016-11-21 05:26:47"},{"id":11,"attr_id":"3","name":"a3-option4 Pocket","image":"attribute_1_5832859720444.png","status":"1","sort_order":"0","created_at":"2016-11-21 05:26:47","updated_at":"2016-11-21 05:26:47"}, {"id":12,"attr_id":"3","name":"a3-option5 Pocket","image":"attribute_1_5832859720444.png","status":"1","sort_order":"0","created_at":"2016-11-21 05:26:47","updated_at":"2016-11-21 05:26:47"},{"id":13,"attr_id":"3","name":"a3-option6 Pocket","image":"attribute_1_5832859720444.png","status":"1","sort_order":"0","created_at":"2016-11-21 05:26:47","updated_at":"2016-11-21 05:26:47"}]';
		myArr.push(myObject);
		
		var myObject = new Object();
		myObject.id = 2;
		myObject.server_attr_id = 4;
		myObject.attr_name = "Attribute 4-Pant cuffs";
		myObject.identifier = "pant4";
		myObject.attr_status = "1";
		myObject.backend_name = "Pant cuffs";
		myObject.option = '[{"id":14,"attr_id":"4","name":"a4-option1 cuffs1","image":"attribute_1_583285971f775.png","status":"1","sort_order":"0","created_at":"2016-11-02 19:40:34","updated_at":"2016-11-21 05:26:47"},{"id":15,"attr_id":"3","name":"a4-option2 cuffs2","image":"attribute_1_583285971fd42.png","status":"1","sort_order":"0","created_at":"2016-11-17 07:48:14","updated_at":"2016-11-21 05:26:47"},{"id":16,"attr_id":"4","name":"a4-option3 cuffs3","image":"attribute_1_58328597200e6.png","status":"1","sort_order":"0","created_at":"2016-11-21 05:26:47","updated_at":"2016-11-21 05:26:47"},{"id":17,"attr_id":"4","name":"a4-option4 cuffs4","image":"attribute_1_5832859720444.png","status":"1","sort_order":"0","created_at":"2016-11-21 05:26:47","updated_at":"2016-11-21 05:26:47"}, {"id":18,"attr_id":"4","name":"a4-option5 Pocket","image":"attribute_1_5832859720444.png","status":"1","sort_order":"0","created_at":"2016-11-21 05:26:47","updated_at":"2016-11-21 05:26:47"}]';
		myArr.push(myObject);
		
		attrDetailsArrSession=myArr;
		gotoAboutUsPage();
		return;
	}
	
	db.transaction(	function (tx){
		var len = 0;
			tx.executeSql('select * from product_attributes ',[],function(tx,results){
					len = results.rows.length;
					if(len>0){
						attrDetailsArrSession = [];
						for (var i = 0; i < len; i++) {
							var jsonObj={};
							jsonObj.id = results.rows.item(i)['id'];
							jsonObj.server_attr_id = results.rows.item(i)['server_attr_id'];
							jsonObj.attr_name = results.rows.item(i)['name'];
							jsonObj.identifier = results.rows.item(i)['identifier'];
							jsonObj.attr_status = results.rows.item(i)['status'];
							jsonObj.backend_name = results.rows.item(i)['backend_name'];
							jsonObj.option = results.rows.item(i)['option'];
							attrDetailsArrSession.push(jsonObj);
						}
					}
				}, errorCB
			);
		},errorCBAttrListDB,successCBAttrListDB
	);
}

function insertMeasurementsDetails(tx) {
	var currDateTimestamp="";
	currDateTimestamp=dateTimestamp();
	tx.executeSql('CREATE TABLE IF NOT EXISTS measurement_details (id integer primary key autoincrement, name text, server_measurement_id integer, status integer, update_timestamp text, group_data text)');
	
	jQuery.each(measurementJsonData, function(index,value) {
		
		var server_measurement_id = value["id"];
		var name = value["name"];
		var meas_status = value["status"];
		var groupJson = '';
		if(value["group"] != ''){
			groupJson = JSON.stringify(value["group"]);
		}
		var update_timestamp = currDateTimestamp;
		
		tx.executeSql('select * from measurement_details where server_measurement_id ='+server_measurement_id ,[],function(tx,results){
			var len = 0;
			len = results.rows.length;
			if(len > 0){
				for (var i = 0; i < len; i++) {
					var localDB_id = results.rows.item(i)['id'];
					var localDB_server_measurement_id = results.rows.item(i)['server_measurement_id'];
					var localDB_name = results.rows.item(i)['name'];
					if(name != ''){
						localDB_name = name;
					}
					var localDB_status = results.rows.item(i)['status'];
					if(meas_status != ''){
						localDB_status = meas_status;
					}
					var localDB_group_data = results.rows.item(i)['group_data'];
					if(groupJson != ''){
						localDB_group_data = groupJson;
					}
					//console.log('update measurement_details');
					tx.executeSql("UPDATE measurement_details SET name = '" + localDB_name + "', update_timestamp = '"+update_timestamp+"', status = "+localDB_status+", group_data = '"+localDB_group_data+"' WHERE id = " + localDB_id + "");
				}
			}else{
				//console.log('INSERT measurement_details');
				tx.executeSql('INSERT INTO measurement_details(name, server_measurement_id, status, update_timestamp, group_data) VALUES (?,?,?,?,?)',
	   	    			[name, server_measurement_id,meas_status, update_timestamp, groupJson], function(tx, res) {
					//console.log("Measurement Data insertId: " + res.insertId + " -- res.rowsAffected 1"+res.rowsAffected);
				});
			}
		});
		
		
	});
}

function insertStaticDetails(tx) {
	var currDateTimestamp="";
	currDateTimestamp=dateTimestamp();
	tx.executeSql('CREATE TABLE IF NOT EXISTS static_details (id integer primary key autoincrement, server_sd_id integer, name text, identifier text, data text, update_timestamp text)');
	
	jQuery.each(staticJsonData, function(index,value) {
		
		var static_server_id = value["id"];
		var server_name = value["name"];
		var identifier = value["identifier"];
		var valueData = value['value'];
		var update_timestamp = currDateTimestamp;
		
		tx.executeSql('select * from static_details where server_sd_id ='+static_server_id ,[],function(tx,results){
			var len = 0;
			len = results.rows.length;
			if(len > 0){
				for (var i = 0; i < len; i++) {
					var localDB_id = results.rows.item(i)['id'];
					var localDB_server_measurement_id = results.rows.item(i)['server_sd_id'];
					var localDB_name = results.rows.item(i)['name'];
					if(server_name != ''){
						localDB_name = server_name;
					}
					var localDB_identifier = results.rows.item(i)['identifier'];
					if(identifier != ''){
						localDB_identifier = identifier;
					}
					var localDB_valueData = results.rows.item(i)['data'];
					if(valueData != ''){
						localDB_valueData = valueData;
					}
					//console.log(localDB_name+' '+localDB_identifier+'');
					//console.log('update static_details');
					localDB_valueData = localDB_valueData.replace("'", " ");
					try{
						tx.executeSql('UPDATE static_details SET name="'+localDB_name+'", update_timestamp="'+update_timestamp+'", identifier="'+localDB_identifier+'", data="'+valueData+'" WHERE id=' + localDB_id);
					}catch(err){
						//console.log('Special Character');
					}
					
				}
			}else{
				//console.log('INSERT static_details');
				tx.executeSql('INSERT INTO static_details(name, server_sd_id, identifier, update_timestamp, data) VALUES (?,?,?,?,?)',
	   	    			[name, static_server_id,identifier, update_timestamp, valueData], function(tx, res) {
					//console.log("static_details Data insertId: " + res.insertId + " -- res.rowsAffected 1"+res.rowsAffected);
				});
			}
		});
		
		
	});
}

function insertOrderDetailsFromServer(tx) {
	var currDateTimestamp="";
	currDateTimestamp=dateTimestamp();
	tx.executeSql('CREATE TABLE IF NOT EXISTS order_details(id integer primary key autoincrement, server_cat_id integer, cat_name text, server_prod_id integer, order_data text,update_timestamp text, server_prod_name text,customer_id integer, option_selected text, status_of_order text, gallery_id integer, gallery_name text, sync_date text, sync_status integer, order_server_id integer, order_date text, order_delivery_date text, is_deleted integer)');
	
	jQuery.each(orderDataFromServer, function(index,value) {
		
		var order_server_id = value["id"];
		var order_id = value["order_id"];
		var customer_id = value["customer_id"];
		var product_name = value["product_name"];
		var order_price = value['order_price'];
		var status_of_order = value['status'];
		if(status_of_order == 1){
			status_of_order = 'Pending';
		}else{
			status_of_order = 'completed';
		}
		var option_selected = value['order_attributes'];
		var order_data = value['order_measurements'];
		var update_timestamp = value['updated_at'];
		
		tx.executeSql('select * from order_details where id ='+order_id ,[],function(tx,results){
			var len = 0;
			len = results.rows.length;
			if(len > 0){
				tx.executeSql("UPDATE order_details SET update_timestamp='"+currDateTimestamp+"', sync_status= 1, is_deleted="+value['status']+"  WHERE id=" + order_id + "");
			}else{
				tx.executeSql('INSERT INTO order_details(id, order_server_id, customer_id, server_prod_name, status_of_order, order_data, option_selected, sync_status, update_timestamp, is_deleted) VALUES (?,?,?,?,?,?,?,?,?,?)',
	   	    			[order_id, order_server_id,customer_id, product_name, status_of_order, order_data, option_selected, 1, update_timestamp,value['status']], function(tx, res) {
					console.log("order_details Data insertId: " + res.insertId + " -- res.rowsAffected 1"+res.rowsAffected);
				});
				
				tx.executeSql('select * from customer_details where id ='+customer_id ,[],function(tx,results){
					len = results.rows.length;
					if(len>0){
						var total_price = '';
						for (var i = 0; i < len; i++) {
							total_price = results.rows.item(0)['total_price'];
						}
						tx.executeSql("UPDATE customer_details SET sync_status= 1, total_price='"+total_price+"' WHERE id=" + customer_id + "");
					}
				});
			}
		});
		
		
	});
}

function insertCustomerDetailsFromServer(tx){
	var currDateTimestamp="";
	currDateTimestamp=dateTimestamp();
	tx.executeSql('CREATE TABLE IF NOT EXISTS customer_details (id integer primary key autoincrement,name text, total_price text, advance_price text, balance_price text, update_timestamp text, contact_number text, email_id text, country text, state text, city text, pincode text, address_one text, address_two text, sync_date text, sync_status integer, cust_server_id integer, is_deleted integer)');
	jQuery.each(customerDataFromServer, function(index,value) {
		var customer_server_id = value["id"];
		var customer_id = value["customer_id"];
		var name = value["name"];
		var contact = value['contact'];
		var email = value['email'];
		var status = value['status'];
		var updated_at = value['updated_at'];
		
		tx.executeSql('select * from customer_details where id ='+customer_id ,[],function(tx,results){
			var len = 0;
			len = results.rows.length;
			if(len > 0){
				console.log('record already exist : '+name);
				tx.executeSql("UPDATE customer_details SET update_timestamp='"+currDateTimestamp+"', sync_status= 1, is_deleted="+value['status']+"  WHERE id=" + customer_id + "");
			}else{
				tx.executeSql('INSERT INTO customer_details(id, cust_server_id, name, contact_number, email_id, sync_status, update_timestamp, is_deleted) VALUES (?,?,?,?,?,?,?,?)',
		    			[customer_id, customer_server_id,name, contact, email, 1, updated_at, status], function(tx, res) {
					console.log("customer_details Data insertId: " + res.insertId + " -- res.rowsAffected 1"+res.rowsAffected);
				});
			}
		});
	});
}

function getStaticListFromLocal(){
	if(testingInBrowser){
		var myArr= new Array();
		var myObject = new Object();
		myObject.id = 1;
		myObject.server_sd_id = 1;
		myObject.name = "Contact Details";
		myObject.identifier = "contact_details";
		myObject.data = "M\/s.Chariman Mensi Lifestyle Private Limited\r\nBasement A, # 96, 34th 'B' Cross, 16th Main, 4th 'T' Block, Jayanagar, Bangalore - 560 041\r\n9480941616\/91085222616\r\nEmail: meettailorrani@gmail.com";
		myArr.push(myObject);
		staticArrSession=myArr;
		
		appendStaticData(staticArrSession);
		return;
	}
	
	db.transaction(	function (tx){
		var len = 0;
			tx.executeSql('select * from static_details ',[],function(tx,results){
					len = results.rows.length;
					if(len>0){
						staticArrSession = [];
						for (var i = 0; i < len; i++) {
							var jsonStaticObj={};
							jsonStaticObj['id'] = results.rows.item(i)['id'];
							jsonStaticObj['server_sd_id'] = results.rows.item(i)['server_sd_id'];
							jsonStaticObj['name'] = results.rows.item(i)['name'];
							jsonStaticObj['identifier'] = results.rows.item(i)['identifier'];
							jsonStaticObj['data'] = results.rows.item(i)['data'];
							staticArrSession.push(jsonStaticObj);
						}
					}
				}, errorCB
			);
		},errorCBStaticListDB,successCBStaticListDB
	);
}

function successCBStaticListDB() {
	appendStaticData(staticArrSession);
}	

function errorCBStaticListDB(err) {
	hideModal();
	console.log("errorCBStaticListDB : "+err.message);
}

function getAttrImagesListFromLocal(){
	if(testingInBrowser){
		var myArr= new Array();
		var myObject = new Object();
		myObject.id = 1;
		myObject.server_sd_id = 1;
		myObject.name = "Contact Details";
		myObject.identifier = "contact_details";
		myObject.data = "M\/s.Chariman Mensi Lifestyle Private Limited\r\nBasement A, # 96, 34th 'B' Cross, 16th Main, 4th 'T' Block, Jayanagar, Bangalore - 560 041\r\n9480941616\/91085222616\r\nEmail: meettailorrani@gmail.com";
		myArr.push(myObject);
		attrImagesArrSession=myArr;
		
		appendStaticData(attrImagesArrSession);
		return;
	}
	
	db.transaction(	function (tx){
		var len = 0;
		// id, attr_id, server_img_id, name, image, status, sort_order, download_status, update_timestamp
			tx.executeSql('select * from attr_images ',[],function(tx,results){
					len = results.rows.length;
					if(len>0){
						attrImagesArrSession = [];
						for (var i = 0; i < len; i++) {
							var jsonStaticObj={};
							jsonStaticObj['id'] = results.rows.item(i)['id'];
							jsonStaticObj['attr_id'] = results.rows.item(i)['attr_id'];
							jsonStaticObj['server_img_id'] = results.rows.item(i)['server_img_id'];
							jsonStaticObj['name'] = results.rows.item(i)['name'];
							jsonStaticObj['image'] = results.rows.item(i)['image'];
							jsonStaticObj['status'] = results.rows.item(i)['status'];
							jsonStaticObj['sort_order'] = results.rows.item(i)['sort_order'];
							jsonStaticObj['download_status'] = results.rows.item(i)['download_status'];
							attrImagesArrSession.push(jsonStaticObj);
						}
					}
				}, errorCB
			);
		},errorCBAttrImagesListDB,successCBAttrImagesListDB
	);
}

function successCBAttrImagesListDB() {
	customLoopForAttrImages();
}	

function errorCBAttrImagesListDB(err) {
	hideModal();
	console.log("errorCBStaticListDB : "+err.message);
}



function getMeasumentListFromLocal(){
	if(testingInBrowser){
		var myArr= new Array();
		var myObject = new Object();
		myObject.id = 1;
		myObject.server_measurement_id = 1;
		myObject.measurement_name = "Mens";
		myObject.status = "1";
		myObject.group_data = '[{"id":1,"name":"Shirts","status":"1","measurement_type_id":"1","created_at":"2016-11-02 23:28:53","updated_at":"2016-11-03 00:00:31","measurements":[{"id":1,"name":"Shirt collar1","status":"1","measurement_group_id":"1","created_at":"2016-11-02 23:28:53","updated_at":"2016-11-03 00:00:31"},{"id":2,"name":"shirt neck2","status":"1","measurement_group_id":"1","created_at":"2016-11-02 23:28:53","updated_at":"2016-11-03 00:00:31"}]},{"id":3,"name":"tee shirt","status":"1","measurement_type_id":"1","created_at":"2016-11-03 00:22:40","updated_at":"2016-11-03 00:22:40","measurements":[{"id":7,"name":"round neck","status":"1","measurement_group_id":"3","created_at":"2016-11-03 00:22:40","updated_at":"2016-11-03 00:22:40"},{"id":8,"name":"with collar","status":"1","measurement_group_id":"3","created_at":"2016-11-03 00:22:40","updated_at":"2016-11-03 00:22:40"}]},{"id":4,"name":"shorts","status":"1","measurement_type_id":"1","created_at":"2016-11-08 18:32:49","updated_at":"2016-11-08 18:32:49","measurements":[{"id":9,"name":"elbow length","status":"1","measurement_group_id":"4","created_at":"2016-11-08 18:32:49","updated_at":"2016-11-17 07:50:56"},{"id":16,"name":"back","status":"1","measurement_group_id":"4","created_at":"2016-11-17 07:50:56","updated_at":"2016-11-17 07:50:56"},{"id":17,"name":"front","status":"1","measurement_group_id":"4","created_at":"2016-11-17 07:50:56","updated_at":"2016-11-17 07:50:56"}]}]';
		myArr.push(myObject);
		measurementArrSession=myArr;
		
		appendMeasurementDataInDiv(measurementArrSession);
		return;
	}
	
	db.transaction(	function (tx){
		var len = 0;
			tx.executeSql('select * from measurement_details ',[],function(tx,results){
					len = results.rows.length;
					if(len>0){
						measurementArrSession = [];
						for (var i = 0; i < len; i++) {
							var jsonMeasurementObj={};
							jsonMeasurementObj['id'] = results.rows.item(i)['id'];
							jsonMeasurementObj['server_measurement_id'] = results.rows.item(i)['server_measurement_id'];
							jsonMeasurementObj['measurement_name'] = results.rows.item(i)['name'];
							jsonMeasurementObj['status'] = results.rows.item(i)['status'];
							jsonMeasurementObj['group_data'] = results.rows.item(i)['group_data'];
							measurementArrSession.push(jsonMeasurementObj);
						}
					}
				}, errorCB
			);
		},errorCBMeasurementListDB,successCBMeasurementListDB
	);
}

function successCBMeasurementListDB() {
	appendMeasurementDataInDiv(measurementArrSession);
}	

function errorCBMeasurementListDB(err) {
	hideModal();
	console.log("errorCBMeasurementListDB : "+err.message);
}

function deleteRecordsFromLocalDB(){
	db.transaction(function(tx) {
		if(deleteRecordsInLocalDBJsonData.length > 0){
			jQuery.each(deleteRecordsInLocalDBJsonData, function(index,value) {
				var tableType = value['type'];
				var tableIndexId = value['type_id'];
				var tableName = '';
				var columnName = '';
				if(tableType == 'product'){
					tableName = 'product_details';
					columnName = 'server_prod_id';
				}else if(tableType == 'category'){
					tableName = 'category';
					columnName = 'server_cat_id';
				}else if(tableType == 'attribute'){
					tableName = 'product_attributes';
					columnName = 'server_attr_id';
				}else if(tableType == 'tailor'){
					tableName = 'tailor_details';
					columnName = 'server_td_id';
				}else if(tableType == 'measurement_type'){
					tableName = 'measurement_details';
					columnName = 'server_measurement_id';
				}else if(tableType == 'measurementgroup'){
					var measuObj = new Object();
					var array = [];
					array = tableIndexId.split(':');
					measuObj['measType'] = array[0];
					measuObj['measGroup'] = array[1];
					needToDeleteInJSonArrayMeasuGroup.push(measuObj); 
				}else if(tableType == 'product gallary'){
					var prodObj = new Object();
					var array = [];
					array = tableIndexId.split(':');
					prodObj['prodId'] = array[0];
					prodObj['galleryId'] = array[1];
					needToDeleteInJsonArrayProductGall.push(prodObj);
				}else if(tableType == 'attribute_option'){
					var attrObj = new Object();
					var array = [];
					array = tableIndexId.split(':');
					attrObj['attrId'] = array[0];
					attrObj['optionId'] = array[1];
					needToDeleteInJsonArrayAttrOptions.push(attrObj);
				}else if(tableType == 'measurements'){
					var measuObj = new Object();
					var array = [];
					array = tableIndexId.split(':');
					measuObj['measType'] = array[0];
					measuObj['measGroup'] = array[1];
					measuObj['measurementId'] = array[2];
					needToDeleteInJSonArrayMeasurements.push(measuObj);
				}
				if(tableName != ''){
					tx.executeSql('select count(*) as mycount from '+tableName+' where '+columnName+'='+tableIndexId+'', [], function(tx, rs) {
				          //console.log('Record count (expected to be 1): ' + rs.rows.item(0).mycount);
				          var recordCount = 0;
				          recordCount = rs.rows.item(0).mycount;
				          if(recordCount > 0){
				        	  tx.executeSql('DELETE FROM '+tableName+' WHERE '+columnName+'='+tableIndexId+'', errorDeleteRecordsCB); 
				        	  if(tableName == 'tailor_details'){
				        		  gotoLoginPage();
				        		  alert('This tailor is successfully removed. Please contact your administrator.');
				        		  return;
				        	  }
				          }
					});
				}
			});
		}
	},errorCBDeleteDataInLocalDB, successCBDeleteDataInLocalDB);
}

function errorDeleteRecordsCB(err){
	hideModal();
	//getCategoriesListFromLocal();
	console.log('errorDeleteRecordsCB : '+err.code);
	console.log('errorDeleteRecordsCB : '+err.message);
}

function errorCBDeleteDataInLocalDB(er){
	hideModal();
	//getCategoriesListFromLocal();
	console.log('errorCBDeleteDataInLocalDB : '+er.code);
	console.log('errorCBDeleteDataInLocalDB : '+er.message);
}

function successCBDeleteDataInLocalDB(){
	deleteChildArraysByMethods();
	callCategoryFunctionIndex = 0;
	callMeasuGroupToDeleteIndex = 0;
	callMeasurementToDeleteIndex = 0;
	callGalleryToDeleteIndex = 0;
	callAttrOptionsToDeleteIndex = 0;
}

var callCategoryFunctionIndex = 0;
var callMeasuGroupToDeleteIndex = 0;
var callMeasurementToDeleteIndex = 0;
var callGalleryToDeleteIndex = 0;
var callAttrOptionsToDeleteIndex = 0;
function deleteChildArraysByMethods(){
	if(needToDeleteInJSonArrayMeasuGroup.length > 0){
		
		if(callMeasuGroupToDeleteIndex == 0){
			deleteRecordsFromMeasurementGroup();
			callMeasuGroupToDeleteIndex++;
			return;
		}
	}else if(needToDeleteInJsonArrayProductGall.length > 0){
		if(callGalleryToDeleteIndex == 0){
			deleteRecordsFromProductGallery();
			callGalleryToDeleteIndex++;
			return;
		}
	}else if(needToDeleteInJsonArrayAttrOptions.length > 0){
		if(callAttrOptionsToDeleteIndex == 0){
			deleteRecordsFromAttributeOption();
			callAttrOptionsToDeleteIndex++;
			return;
		}
	}else if(needToDeleteInJSonArrayMeasurements.length > 0){
		if(callMeasurementToDeleteIndex == 0){
			deleteRecordsFromMeasurements();
			callMeasurementToDeleteIndex++;
			return;
		}
	}else if(needToDeleteInJSonArrayMeasuGroup.length == 0 && needToDeleteInJsonArrayProductGall.length == 0 && 
			needToDeleteInJsonArrayAttrOptions.length == 0 && needToDeleteInJSonArrayMeasurements.length == 0){
		if(callCategoryFunctionIndex == 0){
			dataHasSyncSendReport('deleted_sync');
			getCategoriesListFromLocal();
			callCategoryFunctionIndex ++;
			var deleteRecordsDiv = '';
			if(dataExist){
				deleteRecordsDiv = '<p> Delete Records successfully Removed </p>';
			}
			$('.appendStatusDiv').append(deleteRecordsDiv);
			gotoAboutUsPage();
			return;
		}
	}
}

function deleteRecordsFromProductGallery(){
	var currDateTimestamp=dateTimestamp();
	var update_timestamp = currDateTimestamp;
	db.transaction(	function (tx){
		if(needToDeleteInJsonArrayProductGall.length > 0){
			tx.executeSql('CREATE TABLE IF NOT EXISTS product_details (id integer primary key autoincrement, server_prod_id integer, name text, description text, update_timestamp text, measurement_typeid integer, status integer, attribute_details text, gallery text, category text)');
			jQuery.each(needToDeleteInJsonArrayProductGall, function(index,value) {
				var prodId = value['prodId'];
				var galleryId = value['galleryId'];
				tx.executeSql('select * from product_details where server_prod_id='+prodId ,[],function(tx,results){
					var len = 0;
					len = results.rows.length;
					if(len > 0 && len != undefined){
						var local_DB_gallery = results.rows.item(0)['gallery'];
						var newGalleryObjArr = [];
						if(local_DB_gallery != ''){
							var galleryObj = jQuery.parseJSON(local_DB_gallery);
							jQuery.each(galleryObj, function(index,value) {
								var galleryObject = new Object();
								var gallery_id = value['id'];
								if(parseInt(gallery_id) != parseInt(galleryId)){
									galleryObject = value;
									newGalleryObjArr.push(galleryObject);
		 						}
							});
							var galleryJsonObj = JSON.stringify(newGalleryObjArr);
							tx.executeSql("UPDATE product_details SET update_timestamp='"+update_timestamp+"', gallery='"+galleryJsonObj+"' WHERE server_prod_id="+prodId+"");
						}
					}
				});
			});
		}
	}, errorCBDelRecdsProdGalFn, successCBDelRecdsProdGalFn);
}

function errorCBDelRecdsProdGalFn(err){
	console.log('errorCBDelRecdsProdGalFn : '+ err.code);
	console.log('errorCBDelRecdsProdGalFn : '+ err.message);
	//getCategoriesListFromLocal();
}

function successCBDelRecdsProdGalFn(){
	//console.log('successCBDelRecdsProdGalFn');
	needToDeleteInJsonArrayProductGall = [];
	deleteChildArraysByMethods();
}

function deleteRecordsFromAttributeOption(){
	
	var currDateTimestamp=dateTimestamp();
	var update_timestamp = currDateTimestamp;
	db.transaction(	function (tx){
		tx.executeSql('CREATE TABLE IF NOT EXISTS product_attributes (id integer primary key autoincrement, server_attr_id integer, name text, identifier text, status integer, backend_name text, update_timestamp text, option text)');
		if(needToDeleteInJsonArrayAttrOptions.length > 0){
			jQuery.each(needToDeleteInJsonArrayAttrOptions, function(index,value) {
				var attrId = value['attrId'];
				var optionId = value['optionId'];
				tx.executeSql('select * from product_attributes where server_attr_id ='+attrId ,[],function(tx,results){
					var len = 0;
					len = results.rows.length;
					if(len > 0 && len != undefined){
						var local_DB_option = results.rows.item(0)['option'];
						var newOptionObjArr = [];
						if(local_DB_option != ''){
							var optionObj = jQuery.parseJSON(local_DB_option);
							jQuery.each(optionObj, function(index,value) {
								var optionObject = new Object();
								var option_id = value['id'];
								if(parseInt(optionId) != parseInt(option_id)){
									optionObject = value;
									newOptionObjArr.push(optionObject);
		 						}
							});
							var optionJSONObj = JSON.stringify(newOptionObjArr);
							tx.executeSql("UPDATE product_attributes SET update_timestamp='"+update_timestamp+"', option='"+optionJSONObj+"' WHERE server_attr_id=" + attrId + "");
						}
					}
				});
			});
		}
		
	}, errorCBDelRecdsAttrOptionFn, successCBDelRecdsAttrOptionFn);
}

function errorCBDelRecdsAttrOptionFn(err){
	console.log('errorCBDelRecdsAttrOptionFn : '+ err.code);
	console.log('errorCBDelRecdsAttrOptionFn : '+ err.message);
	//getCategoriesListFromLocal();
}

function successCBDelRecdsAttrOptionFn(){
	//console.log('successCBDelRecdsAttrOptionFn');
	needToDeleteInJsonArrayAttrOptions = [];
	deleteChildArraysByMethods();
}

function deleteRecordsFromMeasurementGroup(){
	
	var currDateTimestamp=dateTimestamp();
	var update_timestamp = currDateTimestamp;
	
	db.transaction(	function (tx){
		tx.executeSql('CREATE TABLE IF NOT EXISTS measurement_details (id integer primary key autoincrement, name text, server_measurement_id integer, status integer, update_timestamp text, group_data text)');
		if(needToDeleteInJSonArrayMeasuGroup.length > 0){
			//console.log('needToDeleteInJSonArrayMeasuGroup.length : ' +needToDeleteInJSonArrayMeasuGroup.length);
			jQuery.each(needToDeleteInJSonArrayMeasuGroup, function(index,value) {
				var measurementTypeId = value['measType'];
				var measurementGroupId = value['measGroup'];
				//console.log('measurementTypeId : '+measurementTypeId + ' measurementGroupId : '+measurementGroupId);
				tx.executeSql('select * from measurement_details where server_measurement_id ='+measurementTypeId ,[],function(tx,results){
					//console.log('results.rows.length :' +results.rows.length);
					var len = 0;
					len = results.rows.length;
					if(len > 0 && len != undefined){
						var local_DB_group_data = results.rows.item(0)['group_data'];
						//console.log(local_DB_group_data);
						var newGroupObjArr = [];
						if(local_DB_group_data != ''){
							var groupObj = jQuery.parseJSON(local_DB_group_data);
							//console.log('groupObj :'+groupObj)
							if(groupObj != ''){
								jQuery.each(groupObj, function(indexObj,valueObj) {
									var groupObject = new Object();
									var measurement_group_id = valueObj['id'];
									if(parseInt(measurementGroupId) != parseInt(measurement_group_id)){
										groupObject = valueObj;
										newGroupObjArr.push(groupObject);
			 						}
								});
							}
							var groupJSONObj = JSON.stringify(newGroupObjArr);
							tx.executeSql("UPDATE measurement_details SET update_timestamp='"+update_timestamp+"', group_data='"+groupJSONObj+"' WHERE server_measurement_id=" + measurementTypeId + "");
						}
					}
				});
			});
		}
	}, errorCBDelRecdsMeasGroupFn, successCBDelRecdsMeasGroupFn);
	
}

function errorCBDelRecdsMeasGroupFn(err){
	console.log('errorCBDelRecdsMeasGroupFn : '+ err.code);
	console.log('errorCBDelRecdsMeasGroupFn : '+ err.message);
	//getCategoriesListFromLocal();
}

function successCBDelRecdsMeasGroupFn(){
	//console.log('successCBDelRecdsMeasGroupFn');
	needToDeleteInJSonArrayMeasuGroup = [];
	deleteChildArraysByMethods();
}

function deleteRecordsFromMeasurements(){
	var currDateTimestamp=dateTimestamp();
	var update_timestamp = currDateTimestamp;
	db.transaction(	function (tx){
		tx.executeSql('CREATE TABLE IF NOT EXISTS measurement_details (id integer primary key autoincrement, name text, server_measurement_id integer, status integer, update_timestamp text, group_data text)');
		//console.log('needToDeleteInJSonArrayMeasurements.length : '+needToDeleteInJSonArrayMeasurements.length);
		if(needToDeleteInJSonArrayMeasurements.length > 0){
			jQuery.each(needToDeleteInJSonArrayMeasurements, function(index,value) {
				var measurementTypeId = value['measType'];
				var measurementGroupId = value['measGroup'];
				var measurementId = value['measurementId'];
				//console.log('measurementTypeId :'+measurementTypeId + " measurementGroupId : "+measurementGroupId + " measurementId :"+measurementId);
				tx.executeSql('select * from measurement_details where server_measurement_id ='+measurementTypeId ,[],function(tx,results){
					//console.log(results.rows.length);
					var len = 0;
					len = results.rows.length;
					if(len > 0 && len != undefined){
						var local_DB_group_data = results.rows.item(0)['group_data'];
						var newGroupObjArr = [];
						if(local_DB_group_data != '' && local_DB_group_data != undefined){
							var groupObj = jQuery.parseJSON(local_DB_group_data);
							jQuery.each(groupObj, function(indexGP,valueGP) {
								var measurement_group_id = valueGP['id'];
								if(parseInt(measurementGroupId) != parseInt(measurement_group_id)){
									newGroupObjArr.push(valueGP);
		 						}else{
		 							var groupObject = {};
		 							groupObject['id'] = valueGP['id'];
		 							groupObject['name'] = valueGP['name'];
		 							groupObject['status'] = valueGP['status'];
		 							groupObject['measurement_type_id'] = valueGP['measurement_type_id'];
		 							groupObject['created_at'] = valueGP['created_at'];
		 							groupObject['updated_at'] = valueGP['updated_at'];
		 							var needToDeleteArrayObject = [];
		 							//console.log("valueGP['measurements'] : "+valueGP['measurements']);
		 							if(valueGP['measurements'] != '' && valueGP['measurements'] != undefined){
		 								jQuery.each(valueGP['measurements'], function(indexObj,valueObj){
			 								if(parseInt(measurementId) != parseInt(valueObj['id'])){
			 									var measuObject = new Object();
			 									measuObject = valueObj;
			 									needToDeleteArrayObject.push(measuObject);
			 								}
			 							});
			 							groupObject['measurements'] = needToDeleteArrayObject;
		 							}
		 							newGroupObjArr.push(groupObject);
		 						}
							});
							var groupJSONObj = JSON.stringify(newGroupObjArr);
							tx.executeSql("UPDATE measurement_details SET update_timestamp='"+update_timestamp+"', group_data='"+groupJSONObj+"' WHERE server_measurement_id=" + measurementTypeId + "");
						}
					}
				});
			});
		}
	}, errorCBDelRecdsMeasurementsFn, successCBDelRecdsMeasurementsFn);
}

function errorCBDelRecdsMeasurementsFn(err){
	console.log('errorCBDelRecdsMeasurementsFn : '+ err.code);
	console.log('errorCBDelRecdsMeasurementsFn : '+ err.message);
	//getCategoriesListFromLocal();
}

function successCBDelRecdsMeasurementsFn(){
	//console.log('successCBDelRecdsMeasurementsFn');
	needToDeleteInJSonArrayMeasurements = [];
	deleteChildArraysByMethods();
}

function insertOrderDetails(){
	var prodHtmlName = $('#prodHtmlName').val();
	var productHTMLId = $('#prodHtmlId').val();
	var categoryHtmlId = $('#categoryHtmlId').val();
	var newOrderId = $('#newOrderId').val();
	var customerIdInput = $('#customerIdInput').val();
	var catNameInputId = $('#catNameInput').val();
	var orderDate = $('#orderDateInput').val();
	var orderDeliveryDate = $('#orderDeliveryDateInput').val();
	var currDateTimestamp="";
	var syncStatus = 0;
	var order_server_id = 0;
	var is_deleted = 1;
	currDateTimestamp=dateTimestamp();
	if(newOrderId == '' || newOrderId == undefined){
		db.transaction(function(tx) {
			
			tx.executeSql('CREATE TABLE IF NOT EXISTS order_details(id integer primary key autoincrement, server_cat_id integer, cat_name text, server_prod_id integer, order_data text,update_timestamp text, server_prod_name text,customer_id integer, option_selected text, status_of_order text, gallery_id integer, gallery_name text, sync_date text, sync_status integer, order_server_id integer, order_date text, order_delivery_date text, is_deleted integer)');
			
				var server_cat_id = categoryHtmlId;
				var server_prod_id = productHTMLId;
				var order_data = JSON.stringify(orderTakenDetails);
				var update_timestamp=currDateTimestamp;
				var server_prod_name = prodHtmlName;
				var optionIdsWithArrays = JSON.stringify(selectedOptionMain);
				var customer_id = customerIdInput;
				var status_of_order = 'Pending';
				var syncOrderDate = '';
				
				tx.executeSql('INSERT INTO order_details(server_cat_id, cat_name, server_prod_id, order_data, update_timestamp, server_prod_name, customer_id, option_selected, status_of_order, gallery_id, gallery_name, sync_date, sync_status, order_server_id, order_date, order_delivery_date, is_deleted) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
							[server_cat_id, catNameInputId, server_prod_id, order_data, update_timestamp,server_prod_name, customer_id, optionIdsWithArrays, status_of_order, galleryIdToSave, galleryNameToSave, syncOrderDate, syncStatus,order_server_id, orderDate, orderDeliveryDate, is_deleted], function(tx, res) {
					//alert("Order Data insertId: " + res.insertId + " -- res.rowsAffected 1"+res.rowsAffected);
					$('#newOrderId').val(res.insertId);
				});
			
		},errorCBInsertOrderDetails, successCBInsertOrderDetails);
	}
}

function successCBInsertOrderDetails() {
	if(testingInBrowser){
		takeCustomerDetailsFn();
	}else{
		//alert('Order is successfully completed.');
		getOrderListFromLocalDB();
	}
}	

function errorCBInsertOrderDetails(err) {
	hideModal();
	console.log("errorCBInsertOrderDetails : "+err.message);
}

function customerAndOrderDetailFn(){
	insertOrderDetails();
}

function orderPageHtmlButton(){
	getOrderListFromLocalDB();
}

function getOrderListFromLocalDB(){
	if(testingInBrowser){
		
		var myArr= new Array();
		var myObject = new Object();
		myObject.id = 1;
		myObject.server_cat_id = 1;
		myObject.server_prod_id = 2;
		myObject.order_data = '[{"measPKId":18, "measName":"RoundNeck", "inputValue":"25"},{"measPKId":19, "measName":"VShape", "inputValue":"30"},{"measPKId":20, "measName":"Chest", "inputValue":"45"},{"measPKId":21, "measName":"Arms", "inputValue":"20"}]';
		myObject.server_prod_name = 'Shirt';
		myObject.update_timestamp = '12-11-2016 13:15:15';
		myObject.status_of_order = 'Completed';
		myObject.order_date = '12-11-2016 13:15:15';
		myObject.order_delivery_date = '18-11-2016 13:15:15'
		myObject.customer_id = 1;
		myArr.push(myObject);
		
		var myObject = new Object();
		myObject.id = 2;
		myObject.server_cat_id = 1;
		myObject.server_prod_id = 3;
		myObject.order_data = '[{"measPKId":18, "measName":"RoundNeck", "inputValue":"25"},{"measPKId":19, "measName":"VShape", "inputValue":"30"},{"measPKId":20, "measName":"Chest", "inputValue":"45"},{"measPKId":21, "measName":"Arms", "inputValue":"20"}]';
		myObject.server_prod_name = 'T-Shirt';
		myObject.update_timestamp = '12-11-2016 13:15:15';
		myObject.status_of_order = 'InProgress';
		myObject.order_date = '12-11-2016 13:15:15';
		myObject.order_delivery_date = '18-11-2016 13:15:15'
		myObject.customer_id = 1;
		myArr.push(myObject);
		
		var myObject = new Object();
		myObject.id = 3;
		myObject.server_cat_id = 1;
		myObject.server_prod_id = 3;
		myObject.order_data = '[{"measPKId":18, "measName":"RoundNeck", "inputValue":"25"},{"measPKId":19, "measName":"VShape", "inputValue":"30"},{"measPKId":20, "measName":"Chest", "inputValue":"45"},{"measPKId":21, "measName":"Arms", "inputValue":"20"}]';
		myObject.server_prod_name = 'T-Shirt';
		myObject.update_timestamp = '12-11-2016 13:15:15';
		myObject.status_of_order = 'InProgress';
		myObject.order_date = '12-11-2016 13:15:15';
		myObject.order_delivery_date = '18-11-2016 13:15:15'
		myObject.customer_id = 2;
		myArr.push(myObject);
		
		orderArrSession=myArr;
		getCustomerListFromLocalDB();
		return;
	}
	
	db.transaction(	function (tx){
		tx.executeSql('CREATE TABLE IF NOT EXISTS order_details(id integer primary key autoincrement, server_cat_id integer, cat_name text, server_prod_id integer, order_data text,update_timestamp text, server_prod_name text,customer_id integer, option_selected text, status_of_order text, gallery_id integer, gallery_name text, sync_date text, sync_status integer, order_server_id integer, order_date text, order_delivery_date text, is_deleted integer)');
		var len = 0;
		orderArrSession = [];
			tx.executeSql('select * from order_details ORDER BY id DESC ',[],function(tx,results){
					len = results.rows.length;
					if(len>0){
						orderArrSession = [];
						for (var i = 0; i < len; i++) {
							var jsonOrderDataObj={};
							jsonOrderDataObj['id'] = results.rows.item(i)['id'];
							jsonOrderDataObj['server_cat_id'] = results.rows.item(i)['server_cat_id'];
							jsonOrderDataObj['cat_name'] = results.rows.item(i)['cat_name'];
							jsonOrderDataObj['server_prod_id'] = results.rows.item(i)['server_prod_id'];
							jsonOrderDataObj['order_data'] = results.rows.item(i)['order_data'];
							jsonOrderDataObj['update_timestamp'] = results.rows.item(i)['update_timestamp'];
							jsonOrderDataObj['server_prod_name'] = results.rows.item(i)['server_prod_name'];
							jsonOrderDataObj['customer_id'] = results.rows.item(i)['customer_id'];
							jsonOrderDataObj['option_selected'] = results.rows.item(i)['option_selected'];
							jsonOrderDataObj['status_of_order'] = results.rows.item(i)['status_of_order'];
							jsonOrderDataObj['gallery_id'] = results.rows.item(i)['gallery_id'];
							jsonOrderDataObj['gallery_name'] = results.rows.item(i)['gallery_name'];
							jsonOrderDataObj['sync_date'] = results.rows.item(i)['sync_date'];
							jsonOrderDataObj['sync_status'] = results.rows.item(i)['sync_status'];
							jsonOrderDataObj['order_server_id'] = results.rows.item(i)['order_server_id'];
							jsonOrderDataObj['order_date'] = results.rows.item(i)['order_date'];
							jsonOrderDataObj['order_delivery_date'] = results.rows.item(i)['order_delivery_date'];
							jsonOrderDataObj['is_deleted'] = results.rows.item(i)['is_deleted'];
							
							orderArrSession.push(jsonOrderDataObj);
						}
					}
				}, errorCB
			);
		},errorCBOrderListDB,successCBOrderListDB
	);

}

function successCBOrderListDB() {
	//console.log('successCBOrderListDB');
	getCustomerListFromLocalDB();
}	

function errorCBOrderListDB(err) {
	hideModal();
	console.log("errorCBOrderListDB : "+err.message);
}

function takeCustomerDetailsFn(){
	if(testingInBrowser){
		getOrderListFromLocalDB();
		return;
	}
	var currDateTimestamp="";
	currDateTimestamp=dateTimestamp();
	var customerName = $('#customerNameInput').val();
	var totalPriceInput = $('#totalPriceInput').val();
	var advancePriceInput = '';
	var balancePriceInput = $('#balancePriceInput').val();
	var contactNumber = $('#contactNumberInput').val();
	var address1Input = $('#address1Input').val();
	var address2Input = $('#address2Input').val();
	var emailIdInput = $('#emailIdInput').val();
	var countryInput = '';
	var stateInput = $('#stateInput').val();
	var cityInput = $('#cityInput').val();
	var pincodeInput = $('#pincodeInput').val();
	var customerIdInput = $('#customerIdInput').val();
	var syncStatus = 0;
	var syncCustomerDate = '';
	var cust_server_id = 0;
	if(customerIdInput == '' || customerIdInput == undefined){
		db.transaction(function(tx) {
			
			tx.executeSql('CREATE TABLE IF NOT EXISTS customer_details (id integer primary key autoincrement,name text, total_price text, advance_price text, balance_price text, update_timestamp text, contact_number text, email_id text, country text, state text, city text, pincode text, address_one text, address_two text, sync_date text, sync_status integer, cust_server_id integer, is_deleted integer)');
			
				var update_timestamp=currDateTimestamp;
				
				tx.executeSql('INSERT INTO customer_details(name, total_price, advance_price, balance_price, update_timestamp, contact_number, email_id, country, state, city, pincode, address_one, address_two, sync_date, sync_status, cust_server_id, is_deleted) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
						[customerName, totalPriceInput, advancePriceInput, balancePriceInput, update_timestamp, contactNumber, emailIdInput, countryInput, stateInput, cityInput, pincodeInput, address1Input, address2Input, syncCustomerDate, syncStatus, cust_server_id, 1], function(tx, res) {
					//alert("Customer Details insertId: " + res.insertId + " -- res.rowsAffected 1"+res.rowsAffected);
					$('#customerIdInput').val(res.insertId);
				});
			
		},errorCBInsertCustomerDetails, successCBInsertCustomerDetails);
	}else{
		insertOrderDetails();
	}
}

function successCBInsertCustomerDetails() {
	
	insertOrderDetails();
}	

function errorCBInsertCustomerDetails(err) {
	hideModal();
	console.log("errorCBInsertCustomerDetails"+ err.message);
}

function getCustomerListFromLocalDB(){
	if(testingInBrowser){
		
		var myArr= new Array();
		var myObject1 = new Object();
		myObject1.id = 1;
		myObject1.name = 'KRISHNA';
		myObject1.total_price = 150;
		myObject1.balance_price = 100;
		myObject1.contact_number = '9999999999';
		myObject1.address_details = 'bangalore';
		myObject1.update_timestamp = '';
		myArr.push(myObject1);
		
		var myObject2 = new Object();
		myObject2.id = 2;
		myObject2.name = 'Ramesh';
		myObject2.total_price = 300;
		myObject2.balance_price = 100;
		myObject2.contact_number = '8888888888';
		myObject2.address_details = 'Mysore';
		myObject2.update_timestamp = '12-11-2016 13:15:15';
		myArr.push(myObject2);
				
		customerArrSession=myArr;
		appendOrderAndCustomerDetails(orderArrSession, customerArrSession);
		return;
	}
	
	db.transaction(	function (tx){
		tx.executeSql('CREATE TABLE IF NOT EXISTS customer_details (id integer primary key autoincrement,name text, total_price text, advance_price text, balance_price text, update_timestamp text, contact_number text, email_id text, country text, state text, city text, pincode text, address_one text, address_two text, sync_date text, sync_status integer, cust_server_id integer, is_deleted integer)');
		var len = 0;
		//name, price, update_timestamp
		customerArrSession = [];
			tx.executeSql('select * from customer_details ORDER BY id DESC ',[],function(tx,results){
					len = results.rows.length;
					if(len>0){
						customerArrSession = [];
						for (var i = 0; i < len; i++) {
							var jsonCustomerDataObj={};
							jsonCustomerDataObj['id'] = results.rows.item(i)['id'];
							jsonCustomerDataObj['name'] = results.rows.item(i)['name'];
							jsonCustomerDataObj['total_price'] = results.rows.item(i)['total_price'];
							jsonCustomerDataObj['advance_price'] = results.rows.item(i)['advance_price'];
							jsonCustomerDataObj['balance_price'] = results.rows.item(i)['balance_price'];
							jsonCustomerDataObj['update_timestamp'] = results.rows.item(i)['update_timestamp'];
							jsonCustomerDataObj['contact_number'] = results.rows.item(i)['contact_number'];
							jsonCustomerDataObj['address_one'] = results.rows.item(i)['address_one'];
							jsonCustomerDataObj['address_two'] = results.rows.item(i)['address_two'];
							jsonCustomerDataObj['email_id'] = results.rows.item(i)['email_id'];
							jsonCustomerDataObj['country'] = results.rows.item(i)['country'];
							jsonCustomerDataObj['state'] = results.rows.item(i)['state'];
							jsonCustomerDataObj['city'] = results.rows.item(i)['city'];
							jsonCustomerDataObj['pincode'] = results.rows.item(i)['pincode'];
							jsonCustomerDataObj['sync_date'] = results.rows.item(i)['sync_date'];
							jsonCustomerDataObj['sync_status'] = results.rows.item(i)['sync_status'];
							jsonCustomerDataObj['cust_server_id'] = results.rows.item(i)['cust_server_id'];
							
							customerArrSession.push(jsonCustomerDataObj);
						}
					}
				}, errorCB
			);
		},errorCBCustomerListDB,successCBCustomerListDB
	);

}

function successCBCustomerListDB() {
	appendOrderAndCustomerDetails(orderArrSession, customerArrSession);
}	

function errorCBCustomerListDB(err) {
	hideModal();
	console.log("errorCBOrderListDB :"+err.message);
}

function updateCustomerDetailsInLocalDB(customerObject){
	var customerId = customerObject['customerId'];
	var customerName = customerObject['customerName'];
	var totalPrice = customerObject['totalPrice'];
	var balancePrice = customerObject['balancePrice'];
	var contactNumber = customerObject['contactNumber'];
	var emailId = customerObject['emailId'];
	var address1 = customerObject['address1'];
	var address2 = customerObject['address2'];
	var state = customerObject['state'];
	var city = customerObject['city'];
	var pincode = customerObject['pincode'];
	var currDateTimestamp = dateTimestamp();
	db.transaction(	function (tx){
		tx.executeSql('select * from customer_details where id ='+customerId ,[],function(tx,results){
			var len = 0;
			len = results.rows.length;
			if(len > 0){
				for (var i = 0; i < len; i++) {
					var syncStatus = results.rows.item(0)['sync_status'];
					var syncDate = results.rows.item(0)['sync_date'];
					if(syncDate != ''){
						tx.executeSql("UPDATE customer_details SET name='" + customerName + "', update_timestamp='"+currDateTimestamp+"', address_two='"+address2+"', address_one='"+address1+"', sync_status= 2, pincode='"+pincode+"', city='"+city+"', state='"+state+"', total_price='"+totalPrice+"', balance_price='"+balancePrice+"', contact_number='"+contactNumber+"', email_id='"+emailId+"'  WHERE id=" + customerId + "");
					}else{
						tx.executeSql("UPDATE customer_details SET name='" + customerName + "', update_timestamp='"+currDateTimestamp+"', address_two='"+address2+"', address_one='"+address1+"', sync_status= 0, pincode='"+pincode+"', city='"+city+"', state='"+state+"', total_price='"+totalPrice+"', balance_price='"+balancePrice+"', contact_number='"+contactNumber+"', email_id='"+emailId+"'  WHERE id=" + customerId + "");
					}
				}
			}
		},errorCBUpdateCustomerDB,successCBUpdateCustomerDB);
		
	},errorCBUpdateCustomerDB,successCBUpdateCustomerDB);
}

function errorInsideQueryUpdateCustomerCB(err){
	hideModal();
	console.log('errorInsideQueryUpdateCustomerCB : '+ err.code);
	console.log('errorInsideQueryUpdateCustomerCB : '+ err.message);
}

function errorCBUpdateCustomerDB(err){
	hideModal();
	console.log('errorCBUpdateCustomerDB : '+ err.code);
	console.log('errorCBUpdateCustomerDB : '+ err.message);
}

function successCBUpdateCustomerDB(){
	updateOrderDetailsInLocalDB(orderDetailsJson);
}

function updateOrderDetailsInLocalDB(orderJson){
	var orderId = orderJson['orderId'];
	var measurementData = JSON.stringify(orderJson['measurementData']);
	
	var order_date = orderJson['order_date'];
	var order_delivery_date = orderJson['order_delivery_date'];
	console.log(order_date);
	console.log(order_delivery_date);
	//console.log('measurementData '+measurementData);
	
	var currDateTimestamp = dateTimestamp();
	db.transaction(	function (tx){
		tx.executeSql('select * from order_details where id ='+orderId ,[],function(tx,results){
			var len = 0;
			len = results.rows.length;
			if(len > 0){
				for (var i = 0; i < len; i++) {
					var syncStatus = results.rows.item(0)['sync_status'];
					var syncDate = results.rows.item(0)['sync_date'];
					if(syncDate != ''){
						tx.executeSql("UPDATE order_details SET order_data='"+ measurementData+"', order_date='"+order_date+"', order_delivery_date='"+order_delivery_date+"', status_of_order='"+selectedStatusOfOrder+"', update_timestamp='"+currDateTimestamp+"', sync_status=2 WHERE id=" + orderId + "");
					}else{
						tx.executeSql("UPDATE order_details SET order_data='"+ measurementData+"', order_date='"+order_date+"', order_delivery_date='"+order_delivery_date+"', status_of_order='"+selectedStatusOfOrder+"', update_timestamp='"+currDateTimestamp+"', sync_status=0 WHERE id=" + orderId + "");
					}
				}
			}
		});
		
	},errorCBUpdateOrderDB,successCBUpdateOrderDB);
}

function errorCBUpdateOrderDB(err){
	hideModal();
	console.log('errorCBUpdateOrderDB : '+ err.code);
	console.log('errorCBUpdateOrderDB : '+ err.message);
}

function successCBUpdateOrderDB(){
	// console.log('successfully updated.');
	orderPageHtmlButton();
}

function updateCustomerDetailsSyncDB(customerObject){
	var customerId = customerObject['customerId'];
	var customerName = customerObject['customerName'];
	var totalPrice = customerObject['totalPrice'];
	var balancePrice = customerObject['balancePrice'];
	var contactNumber = customerObject['contactNumber'];
	var emailId = customerObject['emailId'];
	var address1 = customerObject['address1'];
	var address2 = customerObject['address2'];
	var state = customerObject['state'];
	var city = customerObject['city'];
	var pincode = customerObject['pincode'];
	var currDateTimestamp = dateTimestamp();
	db.transaction(	function (tx){
		tx.executeSql("UPDATE customer_details SET name = '" + customerName + ", update_timestamp = '"+currDateTimestamp+"', address_two = '"+address2+"', address_one = '"+address1+"', sync_status = 2', pincode = '"+pincode+"', city = '"+city+"', state = '"+state+"', total_price = '"+totalPrice+"', balance_price = '"+balancePrice+"', contact_number = '"+contactNumber+"', email_id = '"+emailId+"'  WHERE id = " + customerId + "");
	},errorCBUpdateCustomerSyncDB,successCBUpdateCustomerSyncDB);
}

function errorCBUpdateCustomerSyncDB(err){
	hideModal();
	console.log('errorCBUpdateCustomerSyncDB : '+ err.code);
	console.log('errorCBUpdateCustomerSyncDB : '+ err.message);
}

function successCBUpdateCustomerSyncDB(){
	updateOrderDetailsInLocalDB(orderDetailsJson);
}


/* ************* Database Code Ends   -------------------------  */

/*  ------------------- Common Methods/Function Code Starts -------------------------  */
	function getDataByAction(actionName, mDataJsonString, successCallbackFn, errorCallbackFn) {
		connectionType=checkConnection();
		
		if(connectionType=="Unknown connection" || connectionType=="No network connection"){
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
		else if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
			showModal();
			var loginData={};
			loginData.username=window.localStorage["username"];
			loginData.password=window.localStorage["password"];
			//loginData.gcmregdid = window.localStorage["gcmregistrationId"];
			loginData.gcmregdid = "reg";//For Testing
			
			$.ajax({
				//type : 'POST',
				url:appUrl,
				data : {"action":actionName, "loginData":JSON.stringify(loginData), "mData":mDataJsonString },
				success: successCallbackFn,
			    error: errorCallbackFn
			});
		}
		else{
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
	}
	
	function getDataByUrlAndData(url, data, successCallbackFn, errorCallbackFn, ajaxCallType) {
		connectionType=checkConnection();
		if(connectionType=="Unknown connection" || connectionType=="No network connection"){
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
		else if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
			//showModal();
			/*
			var loginData={};
			loginData.username=window.localStorage["username"];
			loginData.password=window.localStorage["password"];
			loginData.gcmregdid = window.localStorage["gcmregistrationId"];
			loginData.gcmregdid = "reg";//For Testing
			*/
			
			$.ajax({
				type : ajaxCallType,
				url: url,
				data : data,
				success: successCallbackFn,
			    error: errorCallbackFn
			});
		}
		else{
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
	}
	
	function commonSuccessCallback(data) {
		var res=jQuery.parseJSON(data);
		responseData=JSON.stringify(res);
		//console.log(responseData);
	}
	
	function commonErrorCallback(data) {
	    hideModal();
		navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		var responseJson = $.parseJSON(data);
		if(responseJson.status==404){
		     navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
		gotoLoginPage();
	}
	
	function commonPageSuccessCallback(data){
		homePageData(data);
		var responseJson=jQuery.parseJSON(data);
		if(responseJson.statusCode == "0" ){
			var $parentEleObj = $('.common-page-tab1 .mb-st-assignment-list ul.st-assigment');
			$parentEleObj.html("");
			$('.common-page-tab1 .mb-st-assignment-list').show();
			var actionHeading=responseJson["actionHeading"];
			$('.common-page-tab1 .common-page-tab-heading').html(actionHeading);
			
			var action=responseJson["action"];
			var jsonData=responseJson["data"];
			
			if(action=="getHolidays"){
				commonPageAssignmentData($parentEleObj, jsonData);
			}
			else if(action=="getAttendanceForStaff"){
				commonPageAttendanceForStaffData($parentEleObj, jsonData);
			}
			$.mobile.changePage('#common-page','slide');
		}else{
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');					
		}
		hideModal();
	}
	
	function commonPageLiNoDataMsg($parentEleObj, msg){
		var statusClass = "status-common";
		var dataEleObj = '<li>'+
							'<i class="fa fa-dot-circle-o status-circle '+statusClass+' "></i>'+
							'<div class="st-assign-detail">'+
								'<span class="assign-arrow"></span>'+
									'<p class="assign-title"> ' + msg +
									'</p>'+
							'</div>'+
						'</li>';
		$parentEleObj.append(dataEleObj);
	}
	
	function dateTimestamp() {
	    var d = new Date();
	    
	    var yyyy = addZero(d.getFullYear(), 4);
	    var month = addZero(d.getMonth()+1, 2);
	    var dd = addZero(d.getDate(), 2);
	    
	    
	    var hh = addZero(d.getHours(), 2);
	    var mm = addZero(d.getMinutes(), 2);
	    var ss = addZero(d.getSeconds(), 2);
	    var mss = addZero(d.getMilliseconds(), 3);
	    
	    var dateTimeStampTemp = yyyy +'-'+ month +'-'+ dd +"_"+ hh +':'+ mm +':'+ ss +' '+ mss;
	    return dateTimeStampTemp;
	}
	
	function addZero(x,n) {
    while (x.toString().length < n) {
        x = "0" + x;
    }
    return x;
}
/*  ------------------- Common Methods/Function Code Ends -------------------------  */


/*  ------------------- Module-wise Methods/Function Code Starts ------------------  */	
	function getCountByTableName(tablename){
	    var x;
	   
	   // console.log(tablename);
	    db.transaction(function(tx) {
	    	if(tablename == 'tailor_details'){
	    		tx.executeSql('CREATE TABLE IF NOT EXISTS tailor_details (id integer primary key autoincrement, server_td_id integer, first_name text, middle_name text, last_name text, business_title text, address1 text, address2 text, email text, contact1 text, contact2 text, secret_key text, tailor_status integer, city text, pincode text, state_id integer, country_id integer, state_name text, country_name text, update_timestamp text, enable_img_download text)');
	    	}else if(tablename == 'category'){
	    		tx.executeSql('CREATE TABLE IF NOT EXISTS category(id integer primary key autoincrement, server_cat_id integer, parent_id integer,name text,update_timestamp text, description text, catImage text, catStatus integer, children text, sort_order text)');
	    	}
	    	
	        tx.executeSql('select count(*) as mycount from '+tablename+' ', [], function(tx, rs) {
	          //console.log('Record count (expected to be 2): ' + rs.rows.item(0).mycount);
	          var recordCount = 0;
	          recordCount = rs.rows.item(0).mycount;
	          if(parseInt(recordCount) > 0){
	        	  if(tablename == 'tailor_details'){
	        		  //console.log('getTailorDetailsFromLocal');
	        		  //getTailorDetailsFromLocal();
	        		  getTailorDetailsDataFromServer();
	        	  }else if(tablename == 'category'){
	        		  //console.log('getCategoriesListFromLocal');
	        		  getCategoriesListFromLocal();
	        	  }
	          }else if(parseInt(recordCount) == 0){
	        	  if(tablename == 'tailor_details'){
	        		  if(loginUserId == undefined || loginUserId == ''){
	        			  hideModal();
	        			  gotoLoginPage();
	        		  }else if(loginUserId != undefined){
	        			  if(loginUserId != ''){
	        				  getTailorDetailsDataFromServer();
	        			  }
	        				
	        		  }
	        		  
	        	  }else if(tablename == 'category'){
	        		  //console.log('getCategoriesDataFromServer');
	        		  var isOK = confirm("Are you really want to update?");
	        			if(isOK){
	        				getCategoriesDataFromServer();
	        			}else{
	        				getCategoriesListFromLocal();
	        			}
	        		  
	        	  }
	          }
	        }, function(tx, error) {
	        	hideModal();
	          console.log('SELECT error: ' + error.message);
	        });
	      });
	    return x;
	}
	
	function insertAndUpdateDataFromServer(type){
		/*console.log('dataIsFromServer : '+dataIsFromServer);
		if(dataIsFromServer == 1){
			if(type == dataSyncTypeTailor){
				db.transaction(function(tx) {
					tx.executeSql('CREATE TABLE IF NOT EXISTS tailor_details (id integer primary key autoincrement, server_td_id integer, first_name text, middle_name text, last_name text, business_title text, address1 text, address2 text, email text, contact1 text, contact2 text, secret_key text, tailor_status integer, city text, pincode text, state_id integer, country_id integer, state_name text, country_name text, update_timestamp text)');
				});
				getTailorDetailsFromLocal();
			}else if(type == dataSyncTypeCategory){
				db.transaction(function(tx) {
					tx.executeSql('CREATE TABLE IF NOT EXISTS category(id integer primary key autoincrement, server_cat_id integer, parent_id integer,name text,update_timestamp text, description text, catImage text, catStatus integer, children text)');
				});
				getCategoriesListFromLocal();
			}
		}else{*/
		
			connectionType=checkConnection();
			//console.log('connectionType : ' +connectionType);
			console.log(connectionType);
			if(connectionType=="Unknown connection" || connectionType=="No network connection"){
				console.log('connectionType Inside : '+dataSyncTypeTailor);
				if(type == dataSyncTypeTailor){
					db.transaction(function(tx) {
						tx.executeSql('CREATE TABLE IF NOT EXISTS tailor_details (id integer primary key autoincrement, server_td_id integer, first_name text, middle_name text, last_name text, business_title text, address1 text, address2 text, email text, contact1 text, contact2 text, secret_key text, tailor_status integer, city text, pincode text, state_id integer, country_id integer, state_name text, country_name text, update_timestamp text, enable_img_download text)');
						tx.executeSql('select count(*) as mycount from tailor_details ', [], function(tx, rs) {
							 var recordCount = 0;
					          recordCount = rs.rows.item(0).mycount;
					          console.log('connectionType Inside : '+recordCount);
					          if(parseInt(recordCount) > 0){
					        	  console.log('connectionType Inside : calling TailorDetails');
					        	  getTailorDetailsFromLocal();
					          }else{
					        	  hideModal();
					        	  alert('Please connect the Internet.');
					          }
						});
					});
					
					
				}else if(type == dataSyncTypeCategory){
					db.transaction(function(tx) {
						tx.executeSql('CREATE TABLE IF NOT EXISTS category(id integer primary key autoincrement, server_cat_id integer, parent_id integer,name text,update_timestamp text, description text, catImage text, catStatus integer, children text, sort_order text)');
						tx.executeSql('select count(*) as mycount from tailor_details ', [], function(tx, rs) {
							var recordCount = 0;
							recordCount = rs.rows.item(0).mycount;
							console.log('connectionType Inside : '+recordCount);
							if(parseInt(recordCount) > 0){
								console.log('connectionType Inside : calling TailorDetails');
								getCategoriesListFromLocal();
							}else{
					        	  hideModal();
					        	  alert('Please connect the Internet.');
							}
						});
					});
				}
			}
			else if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
				if(type == dataSyncTypeTailor){
					db.transaction(function(tx) {
						tx.executeSql('CREATE TABLE IF NOT EXISTS tailor_details (id integer primary key autoincrement, server_td_id integer, first_name text, middle_name text, last_name text, business_title text, address1 text, address2 text, email text, contact1 text, contact2 text, secret_key text, tailor_status integer, city text, pincode text, state_id integer, country_id integer, state_name text, country_name text, update_timestamp text, enable_img_download text)');
						tx.executeSql('select count(*) as mycount from tailor_details ', [], function(tx, rs) {
							 var recordCount = 0;
					          recordCount = rs.rows.item(0).mycount;
					          if(parseInt(recordCount) > 0){
					        	  getTailorDetailsFromLocal();
					          }else{
					        	  loginUserId = $('#username').val();
					        	  //console.log('Test LOGIN ID : '+loginUserId);
					        	  if(loginUserId == undefined || loginUserId == ''){
					        		  hideModal();
					        		  //alert('Please reset the tailor details, If he is the existing User.');
					        		  gotoLoginPage();
					      		  }else if(loginUserId != undefined){
					      			  if(loginUserId != ''){
					      				  getTailorDetailsDataFromServer();
					      				  //syncCustomerOrderDetails = true;
					      			  }
					      		  }
					          }
						});
					});
				}else if(type == dataSyncTypeCategory){
					db.transaction(function(tx) {
						tx.executeSql('CREATE TABLE IF NOT EXISTS category(id integer primary key autoincrement, server_cat_id integer, parent_id integer,name text,update_timestamp text, description text, catImage text, catStatus integer, children text, sort_order text)');
						tx.executeSql('select count(*) as mycount from category ', [], function(tx, rs) {
							var categoryDiv = '';
							 var recordCount = 0;
					          recordCount = rs.rows.item(0).mycount;
					          if(parseInt(recordCount) > 0){
					        	  var isOK = confirm("Are you really want to update?");
				        			if(isOK){
				        				needUpdate = true;
				        				getCategoriesDataFromServer();
				        			}else{
				        				getCategoriesListFromLocal();
				        			}
					        	  dataExist = true;
					        	  categoryDiv = '<p>Category Data Syncing</p>';
					          }else{
					        	  categoryDiv = '<p>Category Data First Time Syncing</p>';
					        	  needUpdate = true;
					        	  getCategoriesDataFromServer();
					          }
					          $('.appendStatusDiv').append(categoryDiv);
					          gotoStatusReportPage();
					          
						});
					});
				}
			}
		/*}*/
		
	}
	
	function errorCountDBFn(err){
		hideModal();
		console.log('errorCountDBFn : '+err.message);
		console.log('errorCountDBFn : '+err.code);
	}
	
	function checkTailorDetailsInLocalDB(){
		
		//getCountByTableName("tailor_details");
		insertAndUpdateDataFromServer(dataSyncTypeTailor);
	}
	
	function updateFunctionCalling(){
		connectionType = checkConnection();
		if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
			$('.appendStatusDiv').empty();
			checkTailorDetailsInLocalDB();
		}else{
			alert('Please connect the Internet.');
		}
		
	}
	
	function checkCategoryInLocalDB(){
		
		//getCountByTableName("category");
		insertAndUpdateDataFromServer(dataSyncTypeCategory);
	}
	
	function loadDataFromServer(){
		if(testingInBrowser){
			getTailorDetailsFromLocal();
			return;
		}
		checkTailorDetailsInLocalDB();
	}
	
	
	var productImageData = appUrlMain + 'images\/Products\/product_image';
	var attributeImageData = appUrlMain + 'images\/Attributes\/attribute_image';
	var localPath = 'file:///data/data/com.stavyah.tailorrani/files/';

	function getCategoriesDataFromServer(){
		var dataToSend = {};
		dataToSend["secret_key"] = tailorDetailsSession.secret_key;
		dataToSend["uuid"] = mobileUUID;
		var apiCallUrl = appUrlMain + "api/categories/categoriesJson"
		connectionType=checkConnection();
		if(connectionType=="Unknown connection" || connectionType=="No network connection"){
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
		else if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
			$.ajax({
				type : ajaxCallPost,
				url: apiCallUrl,
				data : dataToSend,
				success: successCBServerCatFn,
				error: commonErrorCallback
			});
		}
		else{
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
	}

	function successCBServerCatFn(data){
		var responseJson = $.parseJSON(JSON.stringify(data));
		if(responseJson['error'] == true){
			alert(responseJson['message']);
		}else{
			categoriesJsonData = responseJson["result"];
			// FIXME CHECK JSON DATAv
			var categoryDiv = '';
			if(dataExist){
				categoryDiv = '<p> Updating Category Data </p>';
			}else{
				categoryDiv = '<p> Inserting Category Data </p>';
			}
			$('.appendStatusDiv').append(categoryDiv);
			insertCategories(categoriesJsonData);
		}
	}
	
	function dataHasSyncSendReport(type){
		var dataToSend = {};
		dataToSend["secret_key"] = tailorDetailsSession.secret_key;
		dataToSend["sync_type"] = type;
		dataToSend["uuid"] = mobileUUID;
		var apiCallUrl = appUrlMain + "api/tailors/syncupdateJson"
		connectionType=checkConnection();
		if(connectionType=="Unknown connection" || connectionType=="No network connection"){
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
		else if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
			$.ajax({
				type : ajaxCallPost,
				url: apiCallUrl,
				data : dataToSend,
				success: successCBServerSyncFn,
				error: commonErrorCallback
			});
		}
		else{
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
	}
	
	function successCBServerSyncFn(data){
		var responseJson = $.parseJSON(JSON.stringify(data));
		if(responseJson['error'] == true){
			alert(responseJson['message']);
		}
		//console.log('successCBServerSyncFn : '+ data);
	}
	
	function appendCatListDB(catArrData, subCatArrData) {
		//$("#mainPageId").find('.main-menu').remove();
		//$("#mainPageId").find('.sub-menu').remove();
		var categoryDiv = '<div class="row main-menu main-menu-div" id="main-menu-div" ><ul class="topnav main-menu-ul" id="main-menu-ul">';
		var subCategoryDiv = "";
		$('#newOrderId').val('');
		$('#customerIdInput').val('');
		jQuery.each(catArrData, function(index,value) {
			//console.log('subCategoryDiv : '+catArrData); // For Testing
			var jsonObj=value;
			var primaryCKeyId=jsonObj["id"];
			var server_cat_id=jsonObj["server_cat_id"];
			var name=jsonObj["name"];
			var children=jsonObj["children"];
			var uniqueId = 'parent_'+server_cat_id;
			categoryDiv+='<li class="" data-submenuid="'+uniqueId
					+'" data-cat_id="'+server_cat_id+'" data-lid="'+primaryCKeyId
					+'" data-isparent="0" onclick="menuCategoryOne(this);"> <a href="#">'+name+'</a> </li>';
			//if(children != 0){
				var subCategoryTempDiv="";
				var isExist = false;
				jQuery.each(subCatArrData, function(indexObj,valueObj) {
					//console.log('subCatArrData : '+subCatArrData); // For Testing
					var childJsonObj = valueObj;
					var child_parent_id = childJsonObj["parent_id"];
					var primarySCKeyId = childJsonObj["id"];
					var server_cat_child_id = childJsonObj["server_cat_id"];
					var child_name = childJsonObj['name'];
					if(parseInt(server_cat_id) == parseInt(child_parent_id)){
						
						if(!isExist){
							subCategoryTempDiv += '<li class="childSubMenuClass firstSubCat'+child_parent_id+'" data-lid="'+primarySCKeyId+
							'" data-parcat_id="'+child_parent_id+'" data-cat_name="'+child_name+'" data-isparent="1" data-cat_id="'+server_cat_child_id+'" onclick="mainGalleryFn(this);"><a href="#">'+ child_name +'</a></li>';
						}else{
							subCategoryTempDiv += '<li class="childSubMenuClass" data-lid="'+primarySCKeyId+
							'" data-parcat_id="'+child_parent_id+'" data-cat_name="'+child_name+'" data-isparent="1" data-cat_id="'+server_cat_child_id+'" onclick="mainGalleryFn(this);"><a href="#">'+ child_name +'</a></li>';
						}
						isExist = true;
					}
				});
				
				if(isExist){
					var subCategoryDivFirst = '<div class="row sub-menu sub-menu-div '+uniqueId+' " id="'+uniqueId+'"><ul class="topnav sub-menu-ul" id="sub-menu-ul">';
					subCategoryTempDiv = subCategoryDivFirst + subCategoryTempDiv + '</ul></div>';
				}
				subCategoryDiv += subCategoryTempDiv;
			//}
		});
		categoryDiv+='<li class="float-right "><a href="#aboutUs-page"><i class="fa fa-home"></i></a></li>';
		/*categoryDiv+='<li class="float-right" onclick="orderPageHtmlButton();"> <a href="#"> Order Report </a> </li>';
		categoryDiv+='<li class="float-right"><a href="#contactUs-page">Contact Us Page</a></li>';*/
		categoryDiv+='</ul></div>';
		$('#mainPageId').empty();
		$('#mainPageId').append(categoryDiv);
		$('#mainPageId').append(subCategoryDiv);
		//$('#mainPageId').append('<div class="row hrBarCatClass"></div>');
		$('#mainPageId').append('<div class="row product-list">	</div>');
		$('#mainPageId .product-list').append('<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-align-class homePageViewLogoClass" style="max-height:500px;">	<div class="box"><div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><img alt="logo" src="img/Background2.png"></div></div></div></div>');
		//$('#mainPageId .product-list').append("<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12 text-align-class viewTextHomePageViewClass'> <div class='box'>	<div class='row'><div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'><h3>About Tailor Rani</h3><p>We provide tailoring services at your finger tips and door steps with quality, affordability in all aspects. We provide measure to made services to the customers. It perfectly fits.We are Makers of Custom Handmade Tailored Dresses. We understand 'You cannot tailor make the situation in life, but you can tailor-make the attitudes and dress to fit those every occassions'.</p>	</div> </div></div>	</div>");
		//$( categoryDiv ).insertBefore( "#mainPageId .hrBarCatClass" );
		//$( subCategoryDiv ).insertBefore( "#mainPageId .hrBarCatClass" );
		$('#mainPageId').find('.sub-menu').hide();
		
		getProductsListFromLocal();
		getStaticListFromLocal();
		
		connectionType = checkConnection();
		if(connectionType=="Unknown connection" || connectionType=="No network connection"){
			gotoAboutUsPage();
		}
		
		//getAttributeListFromLocal();
		//gotoProductPage();
		//getOrderListFromLocalDB();
		
		hideModal();
	}
	
	function showProdNamesInImgDownPage(){
		var productJsonArr = productDetailsArrSession;
		jQuery.each(productJsonArr, function(index,value) {
			var jsonObj = value;
			var local_db_id=jsonObj["id"];
			var server_prod_id=jsonObj["server_prod_id"];
			var prod_name=jsonObj["prod_name"];
			
			var tempSpan = '<div class="downloadProImageContainer" id="container'+server_prod_id+'"><p>'+prod_name+'</p><div id='+server_prod_id+'><p></p><span></span></div><button class="downloadProdImg" onclick="downloadProdImage('+server_prod_id+')">Load Images</button></div>';
			$('.downloadProductList').append(tempSpan);
		});
		
		gotoAboutUsPage();
	}
	
	var downloadType = false;
	function downloadProdImage(thisId){
		completedCountImg = 0;
		$('#container'+thisId+'.confirmClass').remove();
		/*showModal();*/
		/*$('.downloadProductList #'+thisId).prop('disabled',true);*/
		var productJsonArr = productDetailsArrSession;
		var folder = 'gallery';
		jQuery.each(productJsonArr, function(index,value) {
			var jsonObj = value;
			var server_prod_id=jsonObj["server_prod_id"];
			var prod_name=jsonObj["prod_name"];
			if(server_prod_id == thisId){
				galleryObj = jQuery.parseJSON(jsonObj['gallery']);
				if(jsonObj['gallery'] != ''){
					var imageCount = 0;
					var totalImageCount = galleryObj.length;
					$('.downloadProductList #'+thisId).find('p').text('Product Images : '+totalImageCount);
					jQuery.each(galleryObj , function(indexObj,valueObj) {
						totalProductImages = parseInt(totalProductImages) + 1;
						var galleryArrObject = new Array();
						var gallery_id = valueObj['id'];
						var image = valueObj["image"];
						//downloadFile(gallery_id, image, 'product');
						var galleryArraysImgUrlTemp = localPath + "/" + 'gallery'+ '/' + image;
						var downloadFileUrl = productImageData + '/' + image;
						/*window.resolveLocalFileSystemURL(
								galleryArraysImgUrlTemp,// File Url 
								function fileExist(fileEntry) { // Exist Success CB
									//console.log('File Exist'); // For Testing
									
									var id = folder+gallery_id;
									
									var progressBarTag = '<div id="remove'+image+'"><span style="width: 100%">'+image+'</span> : '+ '<br/><progress id="'+image+'" class="'+id+'" data-urllink="'+downloadFileUrl+'" data-location="'+galleryArraysImgUrlTemp+'" value="100" max="100" style="width: 100%"></progress>';
									progressBarTag += '<button class="btn btn-primary st-bg-baby-pink ui-btn ui-shadow ui-corner-all '+id+'" data-uniqueid="'+id+'" data-urllink="'+downloadFileUrl+'" onclick="startPauseResumeDownload(this);" data-location="'+galleryArraysImgUrlTemp+'">Re-download</button></div>'
							    	$('#progressBarDiv').append(progressBarTag);
							    	$('#progressBarDiv').show();
							    	updateProgress(100, id);
							    	
							    	
								}, 
								function fileNotExist(e) { // Not Exist Success CB
									//console.log("File not exist");
									console.dir(e);
									downloadType = true;
									$('.downloadProductList #'+thisId).text('Processing..');
									//$('#container'+thisId).find('div').append('Processing..');
									if(!productDownloadExist){
										var progressDivTag = '<div class="confirmClass">Data is downloading</div>';
										$('.downloadProImageContainer').append(progressDivTag);
										console.log("$('#progressBarDiv').find('.confirmClass').length == 0 : " +$('#progressBarDiv').text());
									}
									console.log("$('#progressBarDiv').find('.confirmClass').length == 0 : " +$('#progressBarDiv').text());
									productDownloadExist = true;
									console.log("productDownloadExist : " +productDownloadExist);
									
								}
							);*/
						
						(function(ind) {
						       setTimeout(function(){
						           console.log(ind);
						           downloadFileValidatorFn(downloadFileUrl, folder, image, gallery_id, thisId,0);
						           if(ind === galleryObj.length){
						        	  
						        	   console.log('It was the last one2');
						           }
						       }, 1000 + (1000 * ind));
						   })(indexObj);
						
					});
				}
			}
			
		});
		downloadAttrWithProductId(thisId);
	}
	
	// Remaining
	function getProductDataFromServer(){
		var dataToSend = {};
		dataToSend["secret_key"] = tailorDetailsSession.secret_key;
		dataToSend["uuid"] = mobileUUID;
		var apiCallUrl = appUrlMain + "api/products/productsJson"
		connectionType=checkConnection();
		if(connectionType=="Unknown connection" || connectionType=="No network connection"){
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
		else if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
			$.ajax({
				type : ajaxCallPost,
				url: apiCallUrl,
				data : dataToSend,
				success: successCBServerProductFn,
				error: commonErrorCallback
			});
		}
		else{
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
	}

	function successCBServerProductFn(data){
		var responseJson = $.parseJSON(JSON.stringify(data));
		if(responseJson['error'] == true){
			alert(responseJson['message']);
		}else{
			productJsonData = responseJson["result"];
			productImageData = responseJson['image_url'];
			// FIXME CHECK JSON DATA
			var productDiv = '';
			if(dataExist){
				productDiv = '<p> Product Data Updating Records </p>';
			}else{
				productDiv = '<p> Product Data Inserting </p>';
			}
			$('.appendStatusDiv').append(productDiv);
			db.transaction(insertProductDetails, errorCBInsertProductDetails, successCBInsertProductDetails);
			//
		}
	}
	
	function getAttributesDataFromServer(){
		var dataToSend = {};
		dataToSend["secret_key"] = tailorDetailsSession.secret_key;
		dataToSend["uuid"] = mobileUUID;
		var apiCallUrl = appUrlMain + "api/attributes/attributesJson"
		connectionType=checkConnection();
		if(connectionType=="Unknown connection" || connectionType=="No network connection"){
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
		else if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
			$.ajax({
				type : ajaxCallPost,
				url: apiCallUrl,
				data : dataToSend,
				success: successCallbackAttributesFn,
				error: commonErrorCallback
			});
		}
		else{
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
	}

	function successCallbackAttributesFn(data){
		var responseJson = $.parseJSON(JSON.stringify(data));
		if(responseJson['error'] == true){
			alert(responseJson['message']);
		}else{
			attributeJsonData = responseJson["result"];
			attributeImageData = responseJson['image_url'];
			// FIXME CHECK JSON DATA
			var attributeDiv = '';
			if(dataExist){
				attributeDiv = '<p> Attribute Data Updating </p>';
			}else{
				attributeDiv = '<p> Attribute Data Inserting </p>';
			}
			$('.appendStatusDiv').append(attributeDiv);
			db.transaction(insertAttributesDetails, errorCBInsertAttributeDetails, successCBInsertAttributeDetails);
			//
		}
	}
	
	function getAttrImagesDataFromServer(){
		var dataToSend = {};
		dataToSend["secret_key"] = tailorDetailsSession.secret_key;
		dataToSend["uuid"] = mobileUUID;
		var apiCallUrl = appUrlMain+ "api/attributes/attributeimagesJson"
		connectionType=checkConnection();
		if(connectionType=="Unknown connection" || connectionType=="No network connection"){
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
		else if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
			$.ajax({
				type : ajaxCallPost,
				url: apiCallUrl,
				data : dataToSend,
				success: successCallbackAttrImagesFn,
				error: commonErrorAttrImagesCB
			});
		}
		else{
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
	}
	
	function successCallbackAttrImagesFn(data){
		var responseJson = $.parseJSON(JSON.stringify(data));
		if(responseJson['error'] == true){
			alert(responseJson['message']);
		}else{
			attributeImageJsonData = responseJson["result"];
			var attributeImagesDiv = '';
			if(dataExist){
				attributeImagesDiv = '<p> Attribute Images Data Updating </p>';
			}else{
				attributeImagesDiv = '<p> Attribute Images Data Inserting </p>';
			}
			$('.appendStatusDiv').append(attributeImagesDiv);
			db.transaction(insertAttrImagesDetails, errorCBInsertAttrImagesDetails, successCBInsertAttrImagesDetails);
		}
		
	}
	
	function commonErrorAttrImagesCB(err){
		console.log('commonErrorAttrImagesCB : '+err.code);
		console.log('commonErrorAttrImagesCB : '+err.message);
		$('#downloadAttrImg').hide();
		$('#downloadAttrsyn').prop("disabled",false);
		$('.labelAttrloader').html('Some issue occur Please try again..');
	}
	
	function getGalleryImagesDataFromServer(){
		var dataToSend = {};
		dataToSend["secret_key"] = tailorDetailsSession.secret_key;
		dataToSend["uuid"] = mobileUUID;
		var apiCallUrl = appUrlMain + "api/products/productsimagesJson"
		connectionType=checkConnection();
		if(connectionType=="Unknown connection" || connectionType=="No network connection"){
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
		else if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
			$.ajax({
				type : ajaxCallPost,
				url: apiCallUrl,
				data : dataToSend,
				success: successCBGalleryImagesFn,
				error: commonErrorGalleryImagesCB
			});
		}
		else{
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
	}
	
	function successCBGalleryImagesFn(data){
		var responseJson = $.parseJSON(JSON.stringify(data));
		if(responseJson['error'] == true){
			alert(responseJson['message']);
		}else{
			galleryImageJsonData = responseJson["result"];
			db.transaction(insertGalleryImagesDetails, errorCBInsertGalleryImagesDetails, successCBInsertGalleryImagesDetails);
		}
	}
	
	function commonErrorGalleryImagesCB(err){
		console.log('commonErrorGalleryImagesCB : '+err.code);
		console.log('commonErrorGalleryImagesCB : '+err.message);
		$('#downloadGalleryImg').hide();
		$('#downloadGallerySyn').prop("disabled",false);
		$('.labelGalleryloader').html('Some issue occur Please try again..');
	}
	
	var prodImgCountInProg=0, prodImgCountDownloaded=0;
	var productDownloadExist = false;
	function downloadImagesOfProduct(prodArrDataToDownload){
		
		$('#progressBarDiv').empty();
		gotoDownloadImagePage();
		prodArrDataToDownload = productDetailsArrSession;
		var i = 0;
		var folder = 'gallery';
		jQuery.each(prodArrDataToDownload, function(index,value) {
			var jsonObj=value;
			var galleryObj = '';
			galleryObj = jQuery.parseJSON(jsonObj['gallery']);
			/*var categoryObj = jQuery.parseJSON(jsonObj['category']);
			jQuery.each(categoryObj, function(indexCat, valueCat){
				var cateId = valueCat['cat_id'];
				if(categId == cateId){*/
					if(jsonObj['gallery'] != ''){
						var galleryObject = new Object();
						
						prodImgCountInProg=prodImgCountInProg+galleryObj.length;
						if(prodImgCountInProg>0){
							window.localStorage["productimgflag"]=1;
						}
						
						jQuery.each(galleryObj , function(indexObj,valueObj) {
							totalProductImages = parseInt(totalProductImages) + 1;
							var galleryArrObject = new Array();
							var gallery_id = valueObj['id'];
							var image = valueObj["image"];
							//downloadFile(gallery_id, image, 'product');
							var galleryArraysImgUrlTemp = localPath + "/" + 'gallery'+ '/' + image;
							var downloadFileUrl = productImageData + '/' + image;
							
							window.resolveLocalFileSystemURL(
									galleryArraysImgUrlTemp,// File Url 
									function fileExist(fileEntry) { // Exist Success CB
										//console.log('File Exist'); // For Testing
										/*
										var id = folder+gallery_id;
										
										var progressBarTag = '<div id="remove'+image+'"><span style="width: 100%">'+image+'</span> : '+ '<br/><progress id="'+image+'" class="'+id+'" data-urllink="'+downloadFileUrl+'" data-location="'+galleryArraysImgUrlTemp+'" value="100" max="100" style="width: 100%"></progress>';
										progressBarTag += '<button class="btn btn-primary st-bg-baby-pink ui-btn ui-shadow ui-corner-all '+id+'" data-uniqueid="'+id+'" data-urllink="'+downloadFileUrl+'" onclick="startPauseResumeDownload(this);" data-location="'+galleryArraysImgUrlTemp+'">Re-download</button></div>'
								    	$('#progressBarDiv').append(progressBarTag);
								    	$('#progressBarDiv').show();
								    	updateProgress(100, id);
								    	*/
								    	
									}, 
									function fileNotExist(e) { // Not Exist Success CB
										//console.log("File not exist");
										console.dir(e);
										if(!productDownloadExist){
											var progressDivTag = '<div class="confirmClass">Data is downloading</div>';
											$('#progressBarDiv').append(progressDivTag);
											console.log("$('#progressBarDiv').find('.confirmClass').length == 0 : " +$('#progressBarDiv').text());
											$('#progressBarDiv').show();
										}
										console.log("$('#progressBarDiv').find('.confirmClass').length == 0 : " +$('#progressBarDiv').text());
										productDownloadExist = true;
										console.log("productDownloadExist : " +productDownloadExist);
										downloadFileValidatorFn(downloadFileUrl, folder, image, gallery_id,0);
									}
								);
						});
					}
				/*}
			});*/
			i = parseInt(i) + 1;
		});
		
		if(parseInt(i) == parseInt(prodArrDataToDownload.length)){
			productImagesDownload = true;
			//gotoProductPage();
			appendProdListDB(productDetailsArrSession);
			if($('#progressBarDiv').find('.confirmClass').length == 0 && !productDownloadExist){
	        	/*gotoProductPage();*/
	        }
		}
	}
	
	function appendProdListDB(prodArrData) {
		prodArrData = productDetailsArrSession;
		var mainPageGallery = '';
		var attrMeasPageGallery = '';
		jQuery.each(prodArrData, function(index,value) {
			var jsonObj=value;
			var local_db_id=jsonObj["id"];
			var server_prod_id=jsonObj["server_prod_id"];
			var prod_name=jsonObj["prod_name"];
			var prod_description=jsonObj["prod_description"];
			var galleryObj = '';
			var categoryObj = '';
			galleryObj = jQuery.parseJSON(jsonObj['gallery']);
			categoryObj = jQuery.parseJSON(jsonObj['category']);
			//console.log('galleryObj '+galleryObj); // For Testing
			//console.log('galleryObj '+galleryObj);
			if(jsonObj['category'] != ''){
				jQuery.each(categoryObj, function(indexCat, valueCat){
					if(jsonObj['gallery'] != ''){
						jQuery.each(galleryObj , function(indexObj,valueObj) {
							if(indexObj == 0){
								var gallery_id = valueObj['id'];
								var image = valueObj["image"];
								var prodImage = '';
								//var prodImage = productImageData + '/'+image; // Direct Hitting to server URL
								//var prodImage = window.appRootDir.fullPath + '/' + gallery_id+'_'+image;
								if(testingInBrowser){
									prodImage = 'img/product'+indexObj+'.jpg'; // For Testing
								}else{
									prodImage = localPath + "/" + 'gallery'+ '/' + image; // For Production
								}
								
								//var prodImage = localPath + "/" + 'gallery'+ '/' + image; // For Production
								//var prodImage = 'img/product'+indexObj+'.jpg'; // For Testing
								var server_cat_id = valueCat['cat_id'];
								var galleryImage = '<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 galleriesClass gallcatid'+server_cat_id+'" data-gall_id="'+gallery_id+'" data-cat_id="'+server_cat_id+'" '+
										'data-prod_id="'+server_prod_id+'" data-pro_index="'+index+'" data-prod_name="'+prod_name+'" data-lid="'+local_db_id+'" onclick="getAttrImgFromServer(this)">';
										
								galleryImage+= '<img class="product-image product-img'+gallery_id+'" src="'+prodImage+'" style="width:250px; height:350px;" alt="'+prod_name+'" />'
								galleryImage+= '<p>'+prod_name+'</p>';
								galleryImage+= '</div>';
								
								mainPageGallery += galleryImage;
							}
						});
					}
				});
			}
			
		});
		mainPageGallery += '';
		$("#mainPageId").find('.galleriesClass').remove();
		$("#mainPageId").find('.product-list').append(mainPageGallery);
		$('#mainPageId .product-list').find('.galleriesClass').hide();
		//$('.product-selection-details-div').empty();
		/*if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
			gotoAboutUsPage();
		}*/
		if(connectionType=="Unknown connection" || connectionType=="No network connection"){
			getAttributeListFromLocal();
		}
	}
	
	function getAttrImgFromServer(thisData){
		// Change
		//$('#progressBarDiv').empty();
		//downloadAttrOptFile(attrDetailsArrSession, thisData);
		goToAttributeDiv(thisData);
	}
	
	function downloadAttrWithProductId(productId){
		connectionType=checkConnection();
		var productImages = $('.downloadProductList #'+productId).find('p').text();
		/*var i = 0;*/
		if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
			jQuery.each(productDetailsArrSession, function(indexProd,valueProd) {
				var folder = 'attributes';
				var server_prod_id = valueProd["server_prod_id"];
				var prodAttrIdsArr = [];
				
				// Product Array Count Temp
				var prodCountTemp = 0;
				// Get productAttributeArrayTemp
				var prodAttrArrTemp = jQuery.parseJSON(valueProd.attribute_details);
				if(parseInt(productId) == parseInt(server_prod_id)){
					
					// Iterate Product Attribute Array
					jQuery.each(prodAttrArrTemp, function(indexObj,valueObj) {
						var attrId = valueObj['attr_id'];
						// Push product Attribute Id to ProductAttributeIdsArray
						prodAttrIdsArr[indexObj] = attrId;
					});
					var totalAttrCount = prodAttrIdsArr.length;
					//$('.downloadProductList #'+productId).append('<span class="attr-count" >'+totalAttrCount+'</span>');
					var totalImageCount = 0;
					// Iterate ProductAttributeIdsArray
					jQuery.each(prodAttrIdsArr, function(index1,value1) {
						
						
						
						// Iterate attrDetailsArrSession, attribute details in session
						jQuery.each(attrDetailsArrSession, function(index,value) {
							
							var server_attr_id = value['server_attr_id'];
							
							if(value1 == server_attr_id){
								
								if(value['option'] != ''){
									
										
									// Get & Iterate optionArraysTemp, Options Arrays For This Product
									var optionArraysTemp = jQuery.parseJSON(value['option']);
									downAttrOptFileTotal = downAttrOptFileTotal + optionArraysTemp.length;
									
									jQuery.each(optionArraysTemp, function(index2,value2) {
										totalImageCount = parseInt(totalImageCount) + 1;
										$('.downloadProductList #'+productId).find('p').text(productImages+', Attributes : '+totalAttrCount+', Images : '+totalImageCount);
										
										var optionImg = value2['image'];
										var optionId = value2['id'];
										
										 var downloadFileUrl = attributeImageData + '/' + optionImg;										
										
										// Condition
										//var optionArraysImgUrlTemp = localPath + "/" + 'attributes'+ '/' +optionImg;
										
										// For Testing Main 
										/*window.resolveLocalFileSystemURL(
											optionArraysImgUrlTemp,// File Url 
											function fileExist(fileEntry) { // Exist Success CB
												//console.log('File Exist'); // For Testing
												attrOptAlreadyExistCount=attrOptAlreadyExistCount+1;
												
												var id = folder+optionId;
												var downloadFileUrl = attributeImageData + '/' + optionImg;
												var progressBarTag = '<div id="remove'+optionImg+'"><span style="width: 100%">'+optionImg+'</span> : '+ '<br/><progress id="'+optionImg+'" class="'+id+'" data-urllink="'+downloadFileUrl+'" data-location="'+optionArraysImgUrlTemp+'" value="100" max="100" style="width: 100%"></progress>';
												progressBarTag += '<button class="btn btn-primary st-bg-baby-pink ui-btn ui-shadow ui-corner-all '+id+'" data-uniqueid="'+id+'" data-urllink="'+downloadFileUrl+'" onclick="startPauseResumeDownload(this);" data-location="'+optionArraysImgUrlTemp+'">Re-download</button></div>'
										    	$('#progressBarDiv').append(progressBarTag);
										    	$('#progressBarDiv').show();
										    	updateProgress(100, id);
											}, 
											function fileNotExist(e) { // Not Exist Success CB
												//console.log("File not exist"); // For Testing
												console.dir(e);
												downloadType = true;
												//$('.downloadProductList #'+productId).text('Processing..');
												if(!downloadAttrCheck){
													var progressDivTag = '<div class="confirmClass">Data is downloading</div>';
													$('#progressBarDiv').append(progressDivTag);
													console.log("$('#progressBarDiv').find('.confirmClass').length == 0 : " +$('#progressBarDiv').text());
													$('#progressBarDiv').show();
												}
												//console.log("$('#progressBarDiv').find('.confirmClass').length == 0 : " +$('#progressBarDiv').text());
												//attrOptInProgCount=attrOptInProgCount+1;
												//downloadAttrCheck = true;
												
												
											}
										);
										
										var optionName = value2['name'];
										(function(ind) {
										       setTimeout(function(){
										           console.log(ind);
										           
										           if(ind === optionArraysTemp.length){
										        	  
										        	   console.log('It was the last one');
										           }
										       }, 1000 + (3000 * ind));
										   })(index1);*/
										
										/*
										if(downAttrOptFileTotal == (attrOptAlreadyExistCount + attrOptInProgCount)){
											restartApplication();
										}
										*/
									});
									customLoop(totalImageCount, downloadFileUrl,folder, optionImg, optionId, server_prod_id);
								}
							}
						});
						
					});
				}
				prodCountTemp = parseInt(prodCountTemp)+1;
				/*i = parseInt(i)+1;*/
			});
			/*console.log('i : '+i + 'productDetailsArrSession.length : '+productDetailsArrSession.length);
			if(i == productDetailsArrSession.length && downloadType == false){
				
				$('#container'+productId).find('button').append('Completed');
				hideModal();
			}*/
		}
		
	}
	var j=0;
	function customLoop(len,downloadFileUrl,folder, optionImg, optionId, server_prod_id) {
	    console.log(j+"Delay Condition----optionImg");
	   
		//totalAttrOptImages = parseInt(totalAttrOptImages) + 1;
		downloadFileValidatorFn(downloadFileUrl, folder, optionImg, optionId, server_prod_id,0);
	    j++;
	    if (j<=len) {setTimeout(function(){customLoop(j);},1000);}
	}

	var galleryIdToSave = '';
	var galleryNameToSave = '';
	function goToAttributeDiv(currentData){
		//downloadAttrOptionImages(attrDetailsArrSession);
		$('.selection-menu').each(function(index){
			$(this).find('ul li').removeClass("active").find('a').removeClass("active");
			
			$(this).find('ul li').first().addClass("active").find('a').addClass("active");
		});
		
		var gallCurrId = $(currentData).data('gall_id');
		var pro_index = $(currentData).data('pro_index');
		var prodName = $(currentData).data('prod_name');
		var categoryId = $(currentData).data('cat_id');
		var productId = $(currentData).data('prod_id');
		//console.log('gallCurrId : ' +gallCurrId); // For Testing
		//console.log('pro_index : ' +pro_index); // For Testing
		//console.log('prodName : ' +prodName); // For Testing
		//console.log('categoryId : ' +categoryId); // For Testing
		//console.log('productId : ' +productId); // For Testing
		$('#prodHtmlName').val(prodName);
		$('#prodHtmlId').val(productId);
		$('#categoryHtmlId').val(categoryId);
		var productDataForAttr = productDetailsArrSession; 
		var selectMeasBarPageDiv = '';
		var attrMeasPageGallery = '';
		var attrIds = []; var prodAttrIds = [];
		$('.selMenu-bar').remove();
		$('.optMenu-bar').remove();
		$('.optionPreNextButton').remove();
		jQuery.each(productDataForAttr, function(index,value) {
			
			var jsonObj = value;
			var local_db_id = jsonObj["id"];
			var server_prod_id = jsonObj["server_prod_id"];
			//console.log('server_prod_id : '+server_prod_id); // For Testing
			var prod_name = jsonObj["prod_name"];
			var prod_description = jsonObj["prod_description"];
			var galleryArr = jQuery.parseJSON(jsonObj.gallery);
			var categoryObj = jQuery.parseJSON(jsonObj.category);
			var attributeObj = jQuery.parseJSON(jsonObj.attribute_details);
			if(parseInt(productId) == parseInt(server_prod_id)){
				if(jsonObj.gallery != ''){
					var $prodSelDetailsDiv =$('.product-selection-details-div');
					$prodSelDetailsDiv.find('p.product-name').html(prod_name);
					
					if(galleryArr.length>0){
						
						var $galleryImagesList=$prodSelDetailsDiv.find('.gallery-images-list');
						$galleryImagesList.find('li').remove();
						
						jQuery.each(galleryArr, function(indexGal, valueGal){
							var galId = valueGal['id'];
							var image = valueGal['image'];
							
							measurementTypeId = jsonObj['measurement_typeid'];
							var prodImageSrc = '';
							if(testingInBrowser){
								prodImageSrc = 'img/product'+indexGal+'.jpg';// For Testing
							}else{
								prodImageSrc = localPath + "/" + 'gallery'+ '/' +image;// For Production
							}
							
							
							//var prodImageSrc = 'img/product'+indexGal+'.jpg';// For Testing
							
							//var prodImageSrc = window.appRootDir.fullPath + '/' + galId+'_'+image;
							//var prodImageSrc = localPath + "/" + 'gallery'+ '/' +image;
							//var prodImageSrc = productImageData + '/'+image; // Direct Hitting to server URL
							//initToCheckTheFile(image, productImageData);
							
							var activeClass="";
							if(galId == gallCurrId){
								galleryIdToSave = gallCurrId;
								galleryNameToSave = image;
								//$('.product-image-div-landscape img').attr("src", prodImageSrc);
								$prodSelDetailsDiv.find('.galleryImageClass img').attr("src", prodImageSrc);
								activeClass="active";
							}
							var liObj='<li class="childGalleryClass"><img src="'+prodImageSrc+'" data-prod_id="'+server_prod_id+'" data-childgalid="'+galId+'"  data-folder_type="gallery" data-gallname="'+image+'" class="'+activeClass+' gallCIndClassId'+galId+' image-download" style="width: 200px;" onclick="changeGallInAttMeaCusFn(this)"></li>';
							$galleryImagesList.append(liObj);
						});
					}
				}
			}
			//$(".imageAppendSelMea").pinchzoomer();
			
			var mainPageCatId = $(currentData).data('cat_id');
			var mainPageProdId = $(currentData).data('prod_id');
			if(jsonObj.category != ''){
				jQuery.each(categoryObj, function(indexCat, valueCat){
					var server_cat_id = valueCat['cat_id'];
					if(mainPageCatId == server_cat_id && mainPageProdId == server_prod_id){
						jQuery.each(attributeObj, function(indexObj,valueObj) {
							var paIds = valueObj['id'];
							var attrId = valueObj['attr_id'];
							prodAttrIds[indexObj] = paIds;
							attrIds[indexObj] = attrId;
						});
						if(attrIds.length > 0){
							appendAttrDataByArraysAndIds(prodAttrIds, attrIds, server_cat_id, server_prod_id);
						}else{
							getMeasumentListFromLocal();
							showMeasurementDiv();
							showGalleryDivTag();
						}
					}
				});
			}
		});
	}
	
	function appendStaticData(staticData){
		jQuery.each(staticData, function(index,value) {
			if(value['identifier'] == 'contact_details'){
				$('.appendContactDetails').empty();
				$('.appendContactDetails').append(value['data']);
			}
		});
	}
	
	function showGalleryImage(){
		//popupbeforeposition: function() {
            var maxHeight = $( window ).height() - 60 + "px";
            $( ".photopopup img" ).css( "max-height", maxHeight );
      //  }
	}
	
	function changeGallInAttMeaCusFn(dataObj){
		var $prodSelDetailsDiv =$('.product-selection-details-div');
		var $galleryImagesList=$prodSelDetailsDiv.find('.gallery-images-list');
		var srcOfOnClick = $(dataObj).attr('src');
		var gallCldIndId = $(dataObj).data('childgalid');
		galleryIdToSave = gallCldIndId;
		var gallName = $(dataObj).data('gallname');
		galleryNameToSave = gallName;
			var imageToActive = $prodSelDetailsDiv.find('.galleryImageClass img').attr("src", srcOfOnClick);
			/*$('.product-image-div-landscape img').attr("src", srcOfOnClick);*/
			var activeClass="active";
			$galleryImagesList.find('img').removeClass(activeClass);
			$galleryImagesList.find('.gallCIndClassId'+gallCldIndId).addClass(activeClass);
	}
	
	function downloadAttrOptionImages(attrDetailsArrSession){
		var folder = 'attributes';
		//console.log('attributes downloadAttrOptionImages '); // For Testing
		jQuery.each(attrDetailsArrSession, function(index,value) {
			if(value['option'] != ''){
				var optionObj = jQuery.parseJSON(value['option']);
				jQuery.each(optionObj, function(index2,value2) {
					totalAttrOptImages = parseInt(totalAttrOptImages) + 1;
					var optionId = value2['id'];
					var optionName = value2['name'];
					var optionImg = value2['image'];
					//downloadFile(optionId, optionImg, 'attrOption');
					var downloadFileUrl = attributeImageData + '/' + optionImg;
					downloadFileValidatorFn(downloadFileUrl, folder, optionImg, optionId,0);
				});
			}
		});
		//console.log('attributes downloadAttrOptionImages END : '); // For Testing
	}
	
	var downAttrOptFileTotal=0, attrOptAlreadyExistCount=0, attrOptInProgCount=0;
	function downloadAttrOptFile(attrDetailsArrSession, thisData){
		connectionType=checkConnection();
		
		if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
			if(needUpdate){
				var folder = 'attributes';
				//console.log('attributes downloadAttrOptionImages '); // For Testing
				var downloadAttrCheck = false;
				var productId = $(thisData).data('prod_id');
				// ProductAttributeIdsArray Init
				var prodAttrIdsArr = [];
				gotoDownloadImagePage();
				
				// Product Array Count Temp
				var prodCountTemp = 0;
				
				// Product Array
				jQuery.each(productDetailsArrSession, function(indexProd,valueProd) {
					
					var server_prod_id = valueProd["server_prod_id"];
					// Get productAttributeArrayTemp
					var prodAttrArrTemp = jQuery.parseJSON(valueProd.attribute_details);
					if(parseInt(productId) == parseInt(server_prod_id)){
						
						// Iterate Product Attribute Array
						jQuery.each(prodAttrArrTemp, function(indexObj,valueObj) {
							var attrId = valueObj['attr_id'];
							// Push product Attribute Id to ProductAttributeIdsArray
							prodAttrIdsArr[indexObj] = attrId;
						});
						
						// Iterate ProductAttributeIdsArray
						jQuery.each(prodAttrIdsArr, function(index1,value1) {
							
							// Iterate attrDetailsArrSession, attribute details in session
							jQuery.each(attrDetailsArrSession, function(index,value) {
								
								var server_attr_id = value['server_attr_id'];
								
								if(value1 == server_attr_id){
									
									if(value['option'] != ''){
										
										
										// Get & Iterate optionArraysTemp, Options Arrays For This Product
										var optionArraysTemp = jQuery.parseJSON(value['option']);
										downAttrOptFileTotal = downAttrOptFileTotal + optionArraysTemp.length;
										jQuery.each(optionArraysTemp, function(index2,value2) {
											
											
											var optionImg = value2['image'];
											var optionId = value2['id'];
											// Condition
											var optionArraysImgUrlTemp = localPath + "/" + 'attributes'+ '/' +optionImg;
											
											// For Testing Main 
											window.resolveLocalFileSystemURL(
												optionArraysImgUrlTemp,// File Url 
												function fileExist(fileEntry) { // Exist Success CB
													//console.log('File Exist'); // For Testing
													attrOptAlreadyExistCount=attrOptAlreadyExistCount+1;
													
													var id = folder+optionId;
													var downloadFileUrl = attributeImageData + '/' + optionImg;
													/*var progressBarTag = '<div id="remove'+optionImg+'"><span style="width: 100%">'+optionImg+'</span> : '+ '<br/><progress id="'+optionImg+'" class="'+id+'" data-urllink="'+downloadFileUrl+'" data-location="'+optionArraysImgUrlTemp+'" value="100" max="100" style="width: 100%"></progress>';
													progressBarTag += '<button class="btn btn-primary st-bg-baby-pink ui-btn ui-shadow ui-corner-all '+id+'" data-uniqueid="'+id+'" data-urllink="'+downloadFileUrl+'" onclick="startPauseResumeDownload(this);" data-location="'+optionArraysImgUrlTemp+'">Re-download</button></div>'
											    	$('#progressBarDiv').append(progressBarTag);*/
											    	/*$('#progressBarDiv').show();
											    	updateProgress(100, id);*/
												}, 
												function fileNotExist(e) { // Not Exist Success CB
													//console.log("File not exist"); // For Testing
													console.dir(e);
													if(!downloadAttrCheck){
														var progressDivTag = '<div class="confirmClass">Data is downloading</div>';
														$('#progressBarDiv').append(progressDivTag);
														console.log("$('#progressBarDiv').find('.confirmClass').length == 0 : " +$('#progressBarDiv').text());
														$('#progressBarDiv').show();
													}
													console.log("$('#progressBarDiv').find('.confirmClass').length == 0 : " +$('#progressBarDiv').text());
													attrOptInProgCount=attrOptInProgCount+1;
													downloadAttrCheck = true;
													var downloadFileUrl = attributeImageData + '/' + optionImg;
													totalAttrOptImages = parseInt(totalAttrOptImages) + 1;
													
													var optionName = value2['name'];
													downloadFileValidatorFn(downloadFileUrl, folder, optionImg, optionId,0);
												}
											);
											/*
											if(downAttrOptFileTotal == (attrOptAlreadyExistCount + attrOptInProgCount)){
												restartApplication();
											}
											*/
										});
									}
								}
							});
							
						});
					}
					prodCountTemp = parseInt(prodCountTemp)+1;
				});
				//console.log('attributes downloadAttrOptionImages END : '); // For Testing
				/*if(parseInt(prodCountTemp) == parseInt(productDetailsArrSession.length)){
					goToAttributeDiv(thisData);
				}*/
				if(!downloadAttrCheck){
					goToAttributeDiv(thisData);
				}
			}else{
				goToAttributeDiv(thisData);
			}
		}else{
			goToAttributeDiv(thisData);
		}
	}
	
	
	var attributeForNextIndex = 0;
	var attriOptionExist = false;
	function appendAttrDataByArraysAndIds(prodAttrArr, attrArr, catId, prodId){
		var attributeDiv = '';
		var optionMainDiv = '';
		var attrTempId = 0;
		attributeForNextIndex = 0;
		jQuery.each(attrArr, function(index1,value1) {
			jQuery.each(attrDetailsArrSession, function(index,value) {
				var attrId = value['id'];
				var server_attr_id = value['server_attr_id'];
				var attr_name = value['attr_name'];
				var identifier = value['identifier'];
				var backend_name = value['backend_name'];
				var option = value['option'];
				
				if(value['option'] != ''){
						if(value1 == server_attr_id){
							attriOptionExist = true;
							var optionObj = jQuery.parseJSON(option);
							//console.log('Attr Id ------------------------ '+server_attr_id); // For Testing
							var tempAttrDiv = '<li class="selMenu-bar subMen_attrId'+server_attr_id+' main_attr_ind'+attributeForNextIndex+'" data-main_attind="'+attributeForNextIndex+'" data-cat_id="'+catId+'" data-prod_id="'+prodId+'" data-attrid="'+server_attr_id+'" data-lid="'+attrId+'"><a href="#" onclick="getOptionByAttrId(this);" data-main_attinda="'+attributeForNextIndex+'" data-attri_id="'+server_attr_id+'">'+attr_name+'</a></li>';
							if(attributeDiv == ''){
								attrTempId = server_attr_id;
							}
							jQuery.each(optionObj, function(index2,value2) {
								var optionId = value2['id'];
								var optionName = value2['name'];
								var optionImg = value2['image'];
								/*if(parseInt(dataIsFromServer) == 0){
									downloadFile(optionId, optionImg, 'attrOption');
									setTimeout(function() {
					    				//$('#please-wait-modal').modal('hide');
					    			}, 2000);
								}*/
								//var optionImages = window.appRootDir.fullPath + '/' + optionId+'_'+optionImg;
								//var optionImages = localPath + "/" + 'attributes'+ '/' +optionImg; // For Production
								//var optionImages = attributeImageData + '/'+optionImg; // Direct Hitting to server URL
								var optionImages = '';
								if(testingInBrowser){
									optionImages = 'img/attr'+index2+'.png'; // For Testing
								}else{
									optionImages = localPath + "/" + 'attributes'+ '/' +optionImg; // For Production
								}
								//var optionImages = 'img/attr'+index2+'.png'; // For Testing
								//initToCheckTheFile(optionImg, attributeImageData);
								var tempOptDiv = '<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 single-option attrInd'+attributeForNextIndex+' optMenu-bar attrOpt'+server_attr_id+' div_opt_id'+optionId+'" data-folder_type="attributes" data-optname="'+optionName+'" data-attrindex="'+attributeForNextIndex+'" style="text-align: center;" data-optionsrc="'+optionImg+'" data-attrname="'+attr_name+'" onclick="selectedOptionFn(this);selectedOptionZoomFn(this)" data-opt_id="'+optionId+'" data-cat_id="'+catId+'" data-prod_id="'+prodId+'" data-attrid="'+server_attr_id+'" data-lid="'+attrId+'"><div class="box"><a href="#popupPhotoLandscape" data-rel="popup"	data-position-to="window" class="optionImageClass image-download"  src="'+optionImages+'" data-imgt_attrid="'+server_attr_id+'"  data-imgt_opt_id="'+optionId+'" data-opt_img="'+optionImg+'" data-folder_type="attributes"><img class="attr-opt-hei-wid attrImageReset'+optionId+'" src="'+optionImages+'" data-imgt_cat_id="'+catId+'" data-imgt_prod_id="'+prodId+'" data-imgt_attrid="'+server_attr_id+'"  data-imgt_opt_id="'+optionId+'" data-opt_img="'+optionImg+'" data-imgt_lid="'+attrId+'" alt="'+optionName+'"></div></div>';
								optionMainDiv += tempOptDiv;
							});
							 attributeDiv += tempAttrDiv;
							 attributeForNextIndex = parseInt(attributeForNextIndex) + 1;
						}/*else{
							if(parseInt(dataIsFromServer) == 0){
								jQuery.each(optionObj, function(index2,value2) {
									var optionId = value2['id'];
									var optionName = value2['name'];
									var optionImg = value2['image'];
									downloadFileValidatorFn(optionId, optionImg, 'attrOption');
									downloadFileValidatorFn(downloadFileUrl, folder, optionImg);
									setTimeout(function() {
					    				//$('#please-wait-modal').modal('hide');
					    			}, 2000);
								});
							}
							
						}*/
					
				}
			});
		});
		getMeasumentListFromLocal();
		if(!attriOptionExist){
			showMeasurementDiv();
		}else{
			if(attributeForNextIndex > 0){
				attributeForNextIndex = parseInt(attributeForNextIndex) - 1;
			}
			$('.selMenu-bar').remove();
			$('.optMenu-bar').remove();
			$('.optionPreNextButton').remove();
			$( attributeDiv ).insertAfter( ".selection-menu .selection-menu-ul .galleryDivTag" );
			$('.galleryTag').hide();
			$('.attributeTag').show();
			//$('.selection-menu').append(attributeDiv);
			$('.attr-option-div').append(optionMainDiv);
			$('.attr-option-div .optMenu-bar').hide();
			$('.attrOpt'+attrTempId).show();
			
			//$('.subMen_attrId'+attrTempId).addClass("active");
			$('.selection-menu').each(function(index){
				$(this).find('ul li').removeClass("active").find('a').removeClass("active");
				$(this).find('ul li.subMen_attrId'+attrTempId).addClass("active").find('a').addClass("active");
			});
			
			var appendButtons = '<div class="row optionPreNextButton" style="margin-top: 25px;"><div class="col-xs-6 col-sm-6 col-md-6 col-lg-6"><button class="back-button btn btn-primary st-bg-baby-pink ui-btn ui-shadow ui-corner-all" disabled="disabled" onclick="backButton('+attributeForNextIndex+')">Previous</button></div>';
			if(parseInt(attributeForNextIndex) > 0){
				appendButtons += '<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6"><button class="btn btn-primary st-bg-baby-pink ui-btn ui-shadow ui-corner-all front-button" onclick="frontButton(1)">Next</button></div>';
			}else{
				appendButtons += '<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 float-right"><button class="btn btn-primary st-bg-baby-pink ui-btn ui-shadow ui-corner-all front-button" disabled="disabled" onclick="showMeasurementDiv()">Next</button></div>';
			}
			appendButtons +='</div>';
			
			
			$('.selection-page-options-div .appendButton').append(appendButtons);
			
			
			gotoAttributePageDiv();
		}
		showGalleryDivTag();
	}
	
	function selectedOptionZoomFn(dataObj){
		var $selectedOptionDiv =$('.selMenu-bar');
		var $galleryImagesList=$selectedOptionDiv.find('.single-option .attr-opt-hei-wid');
		var srcOfOnClick = $(dataObj).find('.attr-opt-hei-wid').attr('src');
		var optionId = $(dataObj).data('opt_id');
		var image = $(dataObj).data('optionsrc');
		var attrId = $(dataObj).data('attrid');
		//var gallCldIndId = $(dataObj).data('childgalid');
		//galleryIdToSave = gallCldIndId;
		/*var gallName = $(dataObj).data('gallname');
		galleryNameToSave = gallName;*/
			//var imageToActive = $selectedOptionDiv.find('.galleryImageClass img').attr("src", srcOfOnClick);
			$('.product-image-div-landscape img').attr("src", srcOfOnClick);
			$('.product-image-div-landscape img').show();
		/*	var activeClass="active";
			$galleryImagesList.find('img').removeClass(activeClass);
			$galleryImagesList.find('.gallCIndClassId'+gallCldIndId).addClass(activeClass);*/
	}
	
	
	
	function backButton(index){
		if(index == 0){
			$('.back-button').attr('disabled','disabled');
			//$('.back-button"]').prop('disabled', true);
			//$('.back-button').attr();
		}else{
			var indexForBack = parseInt(index) - 1;
			$('.back-button').attr('onclick','backButton("'+indexForBack+'")');
		}
		var attrId = $('.main_attr_ind'+index).data('attrid');
		$('.galleryTag').hide();
		$('.attributeTag').show();
		//console.log('attrId  : '+attrId); // For Testing
		$('.attr-option-div .optMenu-bar').hide();
		$('.attrOpt'+attrId).show();
		$('.selection-menu').find('ul li').removeClass("active").find('a').removeClass("active");
		$('.selection-menu').find('ul li.subMen_attrId'+attrId).addClass("active").find('a').addClass("active");
		if(parseInt(index) == parseInt(attributeForNextIndex)){
			$('.front-button').attr('onclick', 'showMeasurementDiv()');
			//$('.front-button').attr('disabled','disabled');
		}else{
			var appendFrontIndex = parseInt(index)+1;
			$('.front-button').attr('onclick', 'frontButton("'+appendFrontIndex+'")');
		}
	}
	
	function frontButton(index){
		$('.galleryTag').hide();
		$('.attributeTag').show();
		$('.back-button').removeAttr('disabled');
		if(parseInt(index) <= parseInt(attributeForNextIndex)){
			var attrId = $('.main_attr_ind'+index).data('attrid');
			//console.log('attrId  : '+attrId); // For Testing
			$('.attr-option-div .optMenu-bar').hide();
			$('.attrOpt'+attrId).show();
			$('.selection-menu').find('ul li').removeClass("active").find('a').removeClass("active");
			$('.selection-menu').find('ul li.subMen_attrId'+attrId).addClass("active").find('a').addClass("active");
			var appendBackIndex = parseInt(index) - 1;
			$('.back-button').attr('onclick', 'backButton("'+appendBackIndex+'")');
			if(parseInt(index) == parseInt(attributeForNextIndex)){
				$('.front-button').attr('onclick', 'showMeasurementDiv()');
				//$('.front-button').attr('disabled','disabled');
			}else{
				var appendFrontIndex = parseInt(index)+1;
				$('.front-button').attr('onclick', 'frontButton("'+appendFrontIndex+'")');
			}
		}else{
			showMeasurementDiv();
		}
	}
	
	var optionArrayToSave = [];
	var attributeArrayToSave = [];
	var optionImageName = [];
	var optionImageFullName = [];
	var attrNameArray = [];
	function selectedOptionFn(thisData){
		$('.galleryTag').hide();
		$('.attributeTag').show();
		var attrId = $(thisData).data('attrid');
		var optName = $(thisData).data('optname');
		var optSrc = $(thisData).data('optionsrc');
		var attrName = $(thisData).data('attrname');
		$('.subMen_attrId'+attrId).addClass('option-selected');
		//$('.selection-page-options-div .attr-option-div .attrOpt'+attrId).removeClass('active');
		
		var optId = $(thisData).data('opt_id');
		
		if($(thisData).hasClass('active')){
			attributeArrayToSave=[];
			optionArrayToSave=[];
			optionImageFullName=[];
			optionImageName=[];
			attrNameArray = [];
			$('.div_opt_id'+optId).removeClass('active');
			var thisParent=$(thisData).parents('.attr-option-div').find('.active');
			$(thisParent).each(function(i){
				optionArrayToSave.push(parseInt($(this).data('opt_id')));
				attributeArrayToSave.push(parseInt($(this).data('attrid')));
				optionImageName.push($(this).data('optname'));
				optionImageFullName.push($(this).data('optionsrc'));
				attrNameArray.push($(this).data('attrname'));
			});
			//$(thisData).removeClass('active');
			$('#customerConfirmationPageId .hrClassForOptions .div_opt_id'+optId).remove();
		}else{
			optionArrayToSave.push(optId);
	    	attributeArrayToSave.push(attrId);
	    	optionImageName.push(optName);
	    	optionImageFullName.push(optSrc);
	    	attrNameArray.push(attrName);
	    	$( ".div_opt_id"+optId).clone(true).removeAttr('onclick').appendTo( "#customerConfirmationPageId .hrClassForOptions" );
	    	$(thisData).addClass('active');
			/*var indexOfAttr = jQuery.inArray(parseInt(optId), optionArrayToSave );
			if(indexOfAttr >= 0){
				var tempAttrArray = [];
				var tempOptionArray = [];
				var tempOptionName = [];
				var tempImageName = [];
				for(var i = 0 ;i <=optionArrayToSave.length; i++){
					if(attrId != optionArrayToSave[i]){
						tempAttrArray.push(attributeArrayToSave[i]);
						tempOptionArray.push(optionArrayToSave[i]);
						tempOptionName.push(optionImageName[i]);
						tempImageName.push(optionImageFullName[i]);
					}
				}
				optionArrayToSave = tempOptionArray;
				attributeArrayToSave = tempAttrArray;
				optionImageName = tempOptionName;
				optionImageFullName = tempImageName;
			}*/
		}
		
		//$(thisData).toggleClass("active");
		
		
		//if ($( "#customerConfirmationPageId .customerFieldsToAppendSelected .attrOpt"+attrId ).length > 0 ){
	       // alert('Found with Length '+$( ".div_opt_id"+optId ).length);
	        //$('.customerFieldsToAppendSelected .attrOpt'+attrId).remove();
	    //}else{
	    	//$( ".div_opt_id"+optId ).clone().appendTo( "#customerConfirmationPageId .hrClassForOptions" );
	   // }
	    	/*optionArrayToSave.push(optId);
	    	attributeArrayToSave.push(attrId);
	    	optionImageName.push(optName);
	    	optionImageFullName.push(optSrc);*/
		$("#customerConfirmationPageId .customerFieldsToAppendSelected .optMenu-bar").show();
		
		var $attrIndex = $(thisData).data('attrindex');
		//console.log('$attrIndex ' +$attrIndex); // For Testing
		
		
		
		/*if(parseInt($attrIndex) < parseInt(attributeForNextIndex)){
			$('.back-button').removeAttr('disabled');
			$('.back-button').attr('onclick', 'backButton("'+$attrIndex+'")');
			$attrIndex = $attrIndex + 1;
			console.log('$attrIndex + 1 : '+$attrIndex);
			var attrId = $('.attrInd'+$attrIndex).data('attrid');
			console.log('attrId  : '+attrId);
			$('.attr-option-div .optMenu-bar').hide();
			$('.attrOpt'+attrId).show();
			$('.selection-menu').find('ul li').removeClass("active").find('a').removeClass("active");
			$('.selection-menu').find('ul li.subMen_attrId'+attrId).addClass("active").find('a').addClass("active");
			
			if(parseInt($attrIndex) == parseInt(attributeForNextIndex)){
				$('.front-button').attr('onclick', 'showMeasurementDiv()');
			}else{
				var appendFrontIndex = parseInt($attrIndex)+1;
				$('.front-button').attr('onclick', 'frontButton("'+appendFrontIndex+'")');
			}
			
		}else{
			showMeasurementDiv();
		}*/
		
	}
	
	function getMeasurementsDataFromServer(){
		var dataToSend = {};
		dataToSend["secret_key"] = tailorDetailsSession.secret_key;
		dataToSend["uuid"] = mobileUUID;
		var apiCallUrl = appUrlMain + "api/measurements/measurementsJson"
		connectionType=checkConnection();
		if(connectionType=="Unknown connection" || connectionType=="No network connection"){
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
		else if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
			$.ajax({
				type : ajaxCallPost,
				url: apiCallUrl,
				data : dataToSend,
				success: successCBMeasurementsFn,
				error: commonErrorCallback
			});
		}
		else{
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
	}

	function successCBMeasurementsFn(data){
		var responseJson = $.parseJSON(JSON.stringify(data));
		if(responseJson['error'] == true){
			alert(responseJson['message']);
		}else{
			measurementJsonData = responseJson["result"];
			// FIXME CHECK JSON DATA
			var measurementDiv = '';
			if(dataExist){
				measurementDiv = '<p> Measurement Data Updating </p>';
			}else{
				measurementDiv = '<p> Measurement Data Inserting </p>';
			}
			$('.appendStatusDiv').append(measurementDiv);
			db.transaction(insertMeasurementsDetails, errorCBInsertMeasurementDetails, successCBInsertMeasurementDetails);
			//
		}
		
	}
	
	function successCBInsertMeasurementDetails() {
		/*if(deleteRecordStatus == 0){*/
		dataHasSyncSendReport('measurements_sync');
		var staticDiv = '';
		if(dataExist){
			staticDiv = '<p> Static Data Syncing </p>';
		}else{
			staticDiv = '<p> Static Data First Time Syncing </p>';
		}
		$('.appendStatusDiv').append(staticDiv);
		getStaticDataFromServer();
		
			
			/*return false;
		}else{*/
		//getCategoriesListFromLocal();
		//}
		
	}	
	function errorCBInsertMeasurementDetails(err) {
		hideModal();
		console.log("errorCBInsertMeasurementDetails");
	}
	
	function getStaticDataFromServer(){
		var dataToSend = {};
		dataToSend["secret_key"] = tailorDetailsSession.secret_key;
		dataToSend["uuid"] = mobileUUID;
		var apiCallUrl=appUrlMain+ "api/static/staticJson"
		connectionType=checkConnection();
		if(connectionType=="Unknown connection" || connectionType=="No network connection"){
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
		else if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
			$.ajax({
				type : ajaxCallPost,
				url: apiCallUrl,
				data : dataToSend,
				success: successCBStaticFn,
				error: commonErrorCallback
			});
		}
		else{
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
	}

	function successCBStaticFn(data){
		var responseJson = $.parseJSON(JSON.stringify(data));
		if(responseJson['error'] == true){
			alert(responseJson['message']);
		}else{
			staticJsonData = responseJson["result"];
			// FIXME CHECK JSON DATA
			var staticDiv = '';
			if(dataExist){
				staticDiv = '<p> Static Data Updating </p>';
			}else{
				staticDiv = '<p> Static Data Inserting </p>';
			}
			$('.appendStatusDiv').append(staticDiv);
			db.transaction(insertStaticDetails, errorCBInsertStaticDetails, successCBInsertStaticDetails);
		}
	}
	
	function successCBInsertStaticDetails() {
		/*if(deleteRecordStatus == 0){*/
		if(dataExist){
			var deleteRecordsDiv = '';
			deleteRecordsDiv = '<p> Delete Data Syncing </p>';
			getDataToDeleteInLocalDBFromServer();
			$('.appendStatusDiv').append(deleteRecordsDiv);
		}else{
			getCategoriesListFromLocal();
		}
		//if(syncCustomerOrderDetails){
			getCustomerDetailsDataFromServer();
		//}
	}	
	function errorCBInsertStaticDetails(err) {
		hideModal();
		console.log("errorCBInsertStaticDetails"+err.code);
		console.log("errorCBInsertStaticDetails"+err.message);
	}
	
	function getCustomerDetailsDataFromServer(){
		var dataToSend = {};
		dataToSend["secret_key"] = tailorDetailsSession.secret_key;
		dataToSend["uuid"] = mobileUUID;
		var apiCallUrl=appUrlMain+ "api/customers/sendJson"
		connectionType=checkConnection();
		if(connectionType=="Unknown connection" || connectionType=="No network connection"){
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
		else if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
			$.ajax({
				type : ajaxCallPost,
				url: apiCallUrl,
				data : dataToSend,
				success: successCBCustomerDetailsFromServerFn,
				error: commonErrorCallback
			});
		}
		else{
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
	}
	
	function successCBCustomerDetailsFromServerFn(data){
		var responseJson = $.parseJSON(JSON.stringify(data));
		if(responseJson['error'] == true){
			alert(responseJson['message']);
		}else{
			customerDataFromServer = responseJson["customer_details"];
			// FIXME CHECK JSON DATA
			var staticDiv = '';
			staticDiv = '<p> Customer Details Data Inserting </p>';
			$('.appendStatusDiv').append(staticDiv);
			db.transaction(insertCustomerDetailsFromServer, errorCBInsertCustomerFromServer, successCBInsertCustomerFromServer);
		}
	}
	
	function successCBInsertCustomerFromServer() {
		/*if(deleteRecordStatus == 0){*/
		getOrderDetailsDataFromServer();
		if(dataExist){
			var recordsDiv = '';
			recordsDiv = '<p> Order Details Data Syncing </p>';
			
			$('.appendStatusDiv').append(recordsDiv);
		}else{
			getCategoriesListFromLocal();
		}
		
	}	
	function errorCBInsertCustomerFromServer(err) {
		hideModal();
		console.log("errorCBInsertCustomerFromServer: "+err.code);
		console.log("errorCBInsertCustomerFromServer: "+err.message);
	}
	
	function getOrderDetailsDataFromServer(){
		var dataToSend = {};
		dataToSend["secret_key"] = tailorDetailsSession.secret_key;
		dataToSend["uuid"] = mobileUUID;
		var apiCallUrl=appUrlMain+ "api/orders/sendJson"
		connectionType=checkConnection();
		if(connectionType=="Unknown connection" || connectionType=="No network connection"){
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
		else if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
			$.ajax({
				type : ajaxCallPost,
				url: apiCallUrl,
				data : dataToSend,
				success: successCBOrderDetailsFromServerFn,
				error: commonErrorCallback
			});
		}
		else{
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
	}
	
	function successCBOrderDetailsFromServerFn(data){
		var responseJson = $.parseJSON(JSON.stringify(data));
		if(responseJson['error'] == true){
			alert(responseJson['message']);
		}else{
			orderDataFromServer = responseJson["order_details"];
			// FIXME CHECK JSON DATA
			var recordsDiv = '';
			recordsDiv = '<p> Order Details Data Inserting </p>';
			$('.appendStatusDiv').append(recordsDiv);
			db.transaction(insertOrderDetailsFromServer, errorCBInsertOrderFromServer, successCBInsertOrderFromServer);
		}
	}
	
	function successCBInsertOrderFromServer() {
		/*if(deleteRecordStatus == 0){*/
		console.log('Successfully Completed Order and Customer Details');
	}	
	function errorCBInsertOrderFromServer(err) {
		hideModal();
		console.log("errorCBInsertOrderFromServer: "+err.code);
		console.log("errorCBInsertOrderFromServer: "+err.message);
	}

	function getDataToDeleteInLocalDBFromServer(){
		var dataToSend = {};
		dataToSend["secret_key"] = tailorDetailsSession.secret_key;
		dataToSend["uuid"] = mobileUUID;
		var apiCallUrl=appUrlMain+"api/deleted/deletedinfoJson"
		connectionType=checkConnection();
		if(connectionType=="Unknown connection" || connectionType=="No network connection"){
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
		else if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
			$.ajax({
				type : ajaxCallPost,
				url: apiCallUrl,
				data : dataToSend,
				success: successCBDeleteInDBFromServerFn,
				error: commonErrorCallback
			});
		}
		else{
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
	}
	
	function successCBDeleteInDBFromServerFn(data){
		deleteRecordStatus = 1;
		var responseJson = $.parseJSON(JSON.stringify(data));
		if(responseJson['error'] == true){
			alert(responseJson['message']);
		}else{
			deleteRecordsInLocalDBJsonData = responseJson["result"];
			var deleteRecordsDiv = '';
			if(dataExist){
				deleteRecordsDiv = '<p> Delete Records started deleting in local </p>';
			}
			$('.appendStatusDiv').append(deleteRecordsDiv);
			deleteRecordsFromLocalDB();
		}
	}
	
	function errorCBDeleteInDBServerFn(err){
		console.log('errorCBDeleteInDBServerFn '+err.code);
		console.log('errorCBDeleteInDBServerFn '+err.message);
		//getCategoriesListFromLocal();
	}
	
	function appendMeasurementDataInDiv(measurementArrData){
		$('#measurementPageId').find('.measurement-input-fields-div').empty();
		var appendMeasurementData = '<table> <tbody>';
		var i = 0;
		jQuery.each(measurementArrData, function(index,value) {
			var groupJsonDataCheck = dataTypeCheckJSON(value['group_data']);
			
		//	alert("groupJsonDataCheck -- "+groupJsonDataCheck);
			
			if(value['group_data'] != '' && groupJsonDataCheck != 'other'){
				
				var groupJsonData = jQuery.parseJSON(value['group_data']);
				jQuery.each(groupJsonData, function(groupIndex,groupValue) {
					var groupMeasurementTypeId = groupValue['measurement_type_id'];
					if(groupMeasurementTypeId == measurementTypeId){
						var groupName = groupValue['name'];
						if(groupValue['measurements'] != ''){
							var measurementGroupData = groupValue['measurements'];
							//var groupLabelName = '<div class="col-sm-12">Col12</div><div class="col-sm-6">col6</div><div class="col-sm-6">col6</div>';
							var groupLabelName = '<tr><th colspan=2 class="h3Measure measurements-group-heading-div">'+groupName+'</th></tr>';
							//var groupLabelName = '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 h3Measure measurements-group-heading-div">' + groupName + '</div>';
							appendMeasurementData += groupLabelName;
							//var measurementGroupJsonData = jQuery.parseJSON(measurementGroupData);
							jQuery.each(measurementGroupData, function(measurementsIndex,measurementsValue) {
								var measNameForField  = measurementsValue['name'];
								var measPriKeyForField = measurementsValue['id'];
								var groupFieldsName = '<tr><td class="measure-inputField">'+measNameForField+'</td>'
									+'<td class="measure-inputField">';
								//console.log(measurementTypeDiv); // For Testing
								if(parseInt(measurementTypeDiv) != 0){
									//console.log(measurementTypeDiv); // For Testing
									groupFieldsName += '<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset">';
								}
								groupFieldsName +='<input type="text" class="form-control meas-ind'+i+'" data-meas_name="'+measNameForField+'" data-meas_pkid="'+measPriKeyForField+'" id="measField'+measPriKeyForField+'"'+'name="measField'+measPriKeyForField+'">';
								if(parseInt(measurementTypeDiv) != 0){
									groupFieldsName += '</div>';
								}
								groupFieldsName += '</td></tr>';
								/*var fieldsDiv = '<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 measure-inputField"> <div class="box start-xs start-sm start-md start-lg"> '
									+measNameForField+' <input type="text" class="form-control meas-ind'+i+'" data-meas_name="'+measNameForField+'" data-meas_pkid="'+measPriKeyForField+'" id="measField'+measPriKeyForField+'"'+'name="measField'+measPriKeyForField+'"> </div></div>';*/
								appendMeasurementData += groupFieldsName;
								i = parseInt(i)+1;
							});
						}
					}
				});
			}
			//}
		});
		
		if(parseInt(measurementTypeDiv) != 0){
			appendMeasurementData += '<tr><td colspan="2"><button type="button" name="bookOrder" id="bookOrder" onclick="orderTakeMeastFn()" class="btn btn-primary st-bg-baby-pink ui-btn ui-shadow ui-corner-all"> Book Order </button></td></tr></tbody></table>';
		}else{
			appendMeasurementData += '<tr><td colspan="2"><button type="button" name="bookOrder" id="bookOrder" onclick="orderTakeMeastFn()" class="btn btn-primary st-bg-baby-pink"> Book Order </button></td></tr></tbody></table>';
		}
			measurementTypeDiv++;
		//$('#measurementPageId').find('.measurement-input-fields-div').empty();
		$('#measurementPageId').find('.measurement-input-fields-div').append(appendMeasurementData);
		//$('#measurementPageId').find('.h3Measure').remove();
		//$('#measurementPageId').find('.measureHr').remove();
		//$( appendMeasurementData ).insertBefore( "#measurementPageId .orderSubmitButton" );
		//$('#measurementPageId').find('.measurement-InputFields').append(appendMeasurementData);
	}
	
	
	// Tailor Details
	
	function getTailorDetailsDataFromServer(){
		var dataToSend = {};
		dataToSend["secret_key"] = loginUserId;
		dataToSend["uuid"] = mobileUUID;
		var apiCallUrl=appUrlMain+"api/tailors/tailorinfoJson"
		connectionType=checkConnection();
		if(connectionType=="Unknown connection" || connectionType=="No network connection"){
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
		else if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
			$.ajax({
				type : ajaxCallPost,
				url: apiCallUrl,
				data : dataToSend,
				success: successCBTailorDetailsFn,
				error: commonErrorCallback
			});
		}
		else{
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
	}

	function successCBTailorDetailsFn(data){
		//console.log(data); // For Testing
		var responseJson = $.parseJSON(JSON.stringify(data));
		if(responseJson['error'] == true){
			alert(responseJson['message']);
			hideModal();
			return false;
		}else{
			tailorDetailsJsonData = responseJson["result"];
			//alert('dataparse : '+$.parseJSON(tailorDetailsJsonData));
			//alert('tailorDetailsJsonData : '+tailorDetailsJsonData);
			// FIXME CHECK JSON DATA
			db.transaction(insertTailorDetailsDetails, errorCBInsertTailorDetailsDetails, successCBInsertTailorDetailsDetails);
		}
	}
	
	function successCBInsertTailorDetailsDetails() {
		getTailorDetailsFromLocal();
	}	
	function errorCBInsertTailorDetailsDetails(err) {
		hideModal();
		console.log("errorCBInsertTailorDetailsDetails : "+err.message);
	}
	
/*  ------------------- Module-wise Methods/Function Code Starts ------------------  */	

/*  ------------------- Other Methods/Function like Click, Load, etc. Starts ------------------  */		
	
	var productImagesDownload = false;
	function menuCategoryOne(object){
		$(".main-menu ul li a").removeClass('active');
		$(object).find('a').addClass('active');
		$('.childSubMenuClass').removeClass('active');
		var subMenuId = $(object).data('submenuid');
		$('#mainPageId').find('.sub-menu').hide();
		$("."+subMenuId).show();
		var cateId = $(object).data('cat_id');
		$('#mainPageId .product-list').find('.galleriesClass').hide();
		/*if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
			if(!productImagesDownload){
				//console.log('Testing : '+window.localStorage["productimgflag"]); // For Testing
				if(window.localStorage["productimgflag"]!=2){
					if(needUpdate){
						downloadImagesOfProduct(productDetailsArrSession);
					}else{
						appendProdListDB(productDetailsArrSession);
					}
				}else{
					appendProdListDB(productDetailsArrSession);
				}
			}
		}*/
		appendProdListDB(productDetailsArrSession);
		var cateChildName = $('.firstSubCat'+cateId).data('cat_name');
		var cateChildId = $('.firstSubCat'+cateId).data('cat_id');
		//console.log();
		//mainGalleryFn(object);
		mainGalleryFnByParentCat(cateId, cateChildId, cateChildName);
	}
	
	function getOptionByAttrId(dataObj){
		$('.galleryTag').hide();
		$('.attributeTag').show();
		var attrTempId = $(dataObj).data('attri_id');
		/*
		$('.selection-menu').each(function(index){
			$('ul li').removeClass("active");
			$('ul li a').removeClass("active");
			
			$('ul li.subMen_attrId'+attrTempId).addClass("active");
			$('ul li.subMen_attrId'+attrTempId + ' a').addClass("active");
		});
		*/
		var attrTempIndexId = $(dataObj).data('main_attinda');
		//alert(attrTempIndexId);
		if(parseInt(attrTempIndexId) == 0){
			$('.back-button').attr('disabled','disabled');
			$('.back-button').attr('onclick', 'backButton("'+attrTempIndexId+'")');
		}else if(parseInt(attrTempIndexId) > 0){
			var appendBackIndex = parseInt(attrTempIndexId) - 1;
			$('.back-button').attr('onclick', 'backButton("'+appendBackIndex+'")');
			$('.back-button').removeAttr('disabled');
		}
		
		if(parseInt(attrTempIndexId) == parseInt(attributeForNextIndex)){
			$('.front-button').attr('onclick', 'showMeasurementDiv()');
		}else{
			var appendFrontIndex = parseInt(attrTempIndexId)+1;
			$('.front-button').attr('onclick', 'frontButton("'+appendFrontIndex+'")');
		}
		
		$('.selection-menu').each(function(index){
			$(this).find('ul li').removeClass("active").find('a').removeClass("active");
			$(this).find('ul li.subMen_attrId'+attrTempId).addClass("active").find('a').addClass("active");
		});
		
		
		$('.selection-page-options-div .attr-option-div .optMenu-bar').hide();
		$('.attrOpt'+attrTempId).show();
		gotoAttributePageDiv();
	}
	
	function mainGalleryFn(object){
		$('.homePageViewLogoClass').hide();
		$('.viewTextHomePageViewClass').hide();
		$(".sub-menu ul li a").removeClass('active');
		$(object).find('a').addClass('active');
		var cat_Name = $(object).data('cat_name');
		$('#catNameInput').val(cat_Name);
		var cat_id = $(object).data('cat_id');
		$('.galleriesClass').hide();
		$(".gallcatid"+cat_id).show();
	}
	
	function mainGalleryFnByParentCat(parentCatid,catId, catName){
		$('.homePageViewLogoClass').hide();
		$('.viewTextHomePageViewClass').hide();
		$(".sub-menu ul li a").removeClass('active');
		$('.firstSubCat'+parentCatid).find('a').addClass('active');
		$('#catNameInput').val(catName);
		$('.galleriesClass').hide();
		$(".gallcatid"+catId).show();
	}
	
	function attrMenu(object){
		var attrFindObj = $(object).data('attrIndex');
		$('.optMenu-bar').hide();
		$('.'+attrFindObj).show();
	}
	
	function showMeasurementDiv(){
		$('.selection-menu').each(function(index){
			$(this).find('ul li').removeClass("active").find('a').removeClass("active");
			$(this).find('ul li.measurementDivShow').addClass("active").find('a').addClass("active");
		});
		$('.galleryTag').hide();
		$('.attributeTag').show();
		gotoMeasurementPageDiv();
	}
	
	function showGalleryDivTag(){
		$('.selection-menu').each(function(index){
			$(this).find('ul li').removeClass("active").find('a').removeClass("active");
			$(this).find('ul li.galleryDivTag').addClass("active").find('a').addClass("active");
		});
		$('.galleryTag').show();
		$('.attributeTag').hide();
	}
	
	function dataTypeCheckJSON(someobj) {
		var dataType="";
		try {
			if (typeof someobj != 'string'){
				if(a.constructor.name === 'Array'){
					dataType="Array";
				}
				else if(a.constructor.name === 'Object'){
					dataType="Object";
				}
			}else if (typeof someobj == 'string'){
				dataType="string";
			}else{
				dataType="other";
			}
		} catch (e) {
			dataType="other";
		}
		return dataType;
	}
	
	var orderTakenDetails = [];
	var selectedOptionMainArray = [];
	var selectedOptionMain = {};
	function orderTakeMeastFn(){
		var lengthOfOrder = $( "#measurementPageId .measure-inputField" ).length;
		if(optionArrayToSave.length > 0 && attributeArrayToSave.length > 0 && optionImageName.length > 0 && optionImageFullName.length > 0){
			var arrObject = [];
			for(var i = 0; i< optionArrayToSave.length; i++){
				var childObject = new Object();
				var optionId = optionArrayToSave[i];
				var attrId = attributeArrayToSave[i];
				var optName = optionImageName[i];
				var optSrc = optionImageFullName[i];
				var attrName = attrNameArray[i];
				childObject.optionId = optionId;
				childObject.attrId = attrId;
				childObject.optName = optName;
				childObject.imageName = optSrc;
				childObject.attrName = attrName;
				arrObject.push(childObject);
			}
			selectedOptionMainArray = arrObject;
			selectedOptionMain.optionArray = selectedOptionMainArray;
			selectedOptionMain.product_id = $('#prodHtmlId').val();
			selectedOptionMain.product_name = $('#prodHtmlName').val();
			selectedOptionMain.gallery_id = galleryIdToSave;
			selectedOptionMain.gallery_name = galleryNameToSave;
		}
			 
		if(lengthOfOrder > 0){
			var arrObject= [];
			for(var i = 0; i<lengthOfOrder; i++){
				var childObject = new Object();
				var measPKId = $('.meas-ind'+i).data('meas_pkid');
				var measName = $('.meas-ind'+i).data('meas_name');
				var inputValue = $('#measField'+measPKId).val();
				if(measPKId != undefined  && measPKId != 'undefined'){
					childObject.measPKId = measPKId;
					childObject.measName = measName;
					childObject.inputValue = inputValue;
					arrObject.push(childObject);
				}
			}
			orderTakenDetails = arrObject;
		}
		//insertOrderDetails(arrObject);
		appendOrderMeasurementDetails(orderTakenDetails);
		gotoCustomerPageDiv();
	}
	
	function appendOrderMeasurementDetails(array){
		$('.appendMeasuOrderList').empty();
		var tableMainRow = '';
		var i = 0;
		jQuery.each(array, function(index,value) {
			var tableChildRowStart = '<tr class="insertedMeasList">'
			var tableChildRowEnd = '';
			if(parseInt(index) % 2 == 0){
				tableChildRowStart += '<td> '+value.measName+' </td><td>  '+value.inputValue+' </td>';
				tableMainRow += tableChildRowStart;
			}else{
				tableChildRowEnd += '<td> '+value.measName+' </td><td>  '+value.inputValue+' </td><tr>';
				tableMainRow += tableChildRowEnd;
			}
			i = parseInt(i)+1;
		});
		if(i % 2 != 0){
			var tableChildRowEnd = '<td> &nbsp; </td><td> &nbsp; </td><tr>';
			tableMainRow += tableChildRowEnd;
		}
		$('.appendMeasuOrderList').append(tableMainRow);
	}
	
	function appendOrderAndCustomerDetails(orderArrData, customerArrData){
		/*$('#prodHtmlName').val('');
		$('#prodHtmlId').val('');
		$('#categoryHtmlId').val('');
		$('#customerIdInput').val('');
		$('#newOrderId').val('');
		$('#customerNameInput').val('');
		$('#priceInput').val('');
		$('#contactNumberInput').val('');
		$('#addressInput').val('');*/
		$('#orderReportPageId').find('table tbody').empty();
		var tableRowMain = '';
		if(orderArrData != ''){
			sendCustomerDataToSaveInServer = [];
			sendCustomerDataToUpdateInServer = [];
			sendOrderDataToSaveInServer = [];
			sendOrderDataToUpdateInServer = [];
			jQuery.each(orderArrData, function(index,value) {
				var order_id = value['id'];
				var server_cat_id = value['server_cat_id'];
				var server_prod_id = value['server_prod_id'];
				var cat_name = value['cat_name'];
				var order_data = value['order_data'];
				var order_date = value['order_date'];
				var order_delivery_date = value['order_delivery_date'];
				//console.log('order_data --------- '+order_data); // For Testing
				var server_prod_name = value['server_prod_name'];
				var update_timestamp = value['update_timestamp'];
				var status_of_order = value['status_of_order'];
				var option_selected = value['option_selected'];
				var is_deleted = value['is_deleted'];
				console.log(is_deleted);
				//console.log('option_selected --------- '+option_selected); // For Testing
				var sync_date_order = value['sync_date'];
				var sync_status_order = value['sync_status'];
				//console.log('sync_date_order  ' +sync_date_order); // For Testing
				//console.log('sync_status_order ' +sync_status_order); // For Testing
				var order_server_id = value['order_server_id'];
				//console.log($.parseJSON(option_selected));
				//console.log(JSON.stringify(option_selected));
				var customer_id = value['customer_id'];
				var arr = update_timestamp.split('_');
				var tableRow = '';
				//tableRow += '<tr><td>'+order_id+'</td>';
				tableRow += '<tr>';
				var customerExist = false;
				var customerName = '';
				var contactNumber = '';
				var total_price = '';
				var emailId = '';
				var sync_date_customer = '';
				var sync_status_customer = 0;
				var customer_server_id;
				var balancePrice = '';
				jQuery.each(customerArrData, function(indexObj,valueObj) {
					if(parseInt(customer_id) == parseInt(valueObj['id'])){
						customerName = valueObj['name'];
						contactNumber = valueObj['contact_number'];
						total_price = valueObj['total_price'];
						if(total_price == ''){
							total_price = 0;
						}
						if(balancePrice == ''){
							balancePrice = 0;
						}
						balancePrice = valueObj['balance_price'];
						customer_server_id = valueObj['cust_server_id'];
						//name, total_price, advance_price, balance_price, update_timestamp, contact_number, email_id, country, state, city, pincode, address_one, address_two, sync_date
						emailId = valueObj['email_id'];
						sync_date_customer = valueObj['sync_date'];
						sync_status_customer = valueObj['sync_status'];
						//console.log('sync_date_customer  ' +sync_date_customer); // For Testing
						//console.log('sync_status_customer ' +sync_status_customer); // For Testing
						tableRow += '<td>'+customerName+'<br/>'+contactNumber+' </td>';
						tableRow += '<td>'+total_price+' / '+balancePrice+'</td>';
						customerExist = true;
					}
				});
				if(!customerExist){
					tableRow += '<td> &nbsp;</td>';
					tableRow += '<td> &nbsp;</td>';
				}
				tableRow += '<td> '+order_date+' </td>';
				tableRow += '<td> '+order_delivery_date+' </td>';
				tableRow += '<td> '+status_of_order+' </td>';
				tableRow += '<td> <button type="button" class="btn btn-primary st-bg-baby-pink ui-btn ui-shadow ui-corner-all" onclick="viewOrderDetailsByOrderId( ' + order_id + ' );">Edit</button>'
						+' <button type="button" class="btn btn-primary st-bg-baby-pink ui-btn ui-shadow ui-corner-all" onclick="deleteOrder( ' + order_id + ', '+customer_id+' );">Delete</button></td></tr>';
				//console.log('Index file Calling server to send data Order customer.'); // For Testing
				connectionType=checkConnection();
				if(testingInBrowser){
					connectionType = 'abcde';
				}
				if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 5G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
					//if(sendDataToServerStatus == false){
						var currDateTimestamp="";
						currDateTimestamp=dateTimestamp();
						if(sync_status_customer != 1){
							var dataToSendCustomer = new Object();
							//dataToSendCustomer["secret_key"] = tailorDetailsSession.secret_key;
							dataToSendCustomer["name"] = customerName;
							//dataToSendCustomer["tailor_id"] = tailorDetailsSession.tailor_details_id;
							dataToSendCustomer["customer_id"] = customer_id;
							dataToSendCustomer["contact"] = contactNumber;
							dataToSendCustomer["email"] = emailId;
							dataToSendCustomer["status"] = is_deleted;
							//dataToSendCustomer["sync_date"] = sync_date_customer;
							//dataToSendCustomer["sync_status"] = sync_status_customer;
							
							if(sync_date_customer == '' && parseInt(sync_status_customer) == 0){
								//console.log('dataToSendCustomer status 0 --- '+dataToSendCustomer); // For Testing
								sendCustomerDataToSaveInServer.push(dataToSendCustomer);
								//console.log(JSON.stringify(sendCustomerDataToSaveInServer)) // For Testing
							}else{
								//console.log('dataToSendCustomer status 2 --- '+dataToSendCustomer); // For Testing
								dataToSendCustomer["id"] = customer_server_id;
								sendCustomerDataToUpdateInServer.push(dataToSendCustomer);
								//console.log(JSON.stringify(sendCustomerDataToUpdateInServer)) // For Testing
							}
						}
						if(sync_status_order != 1){
							var dataToSendOrder = {};
							//dataToSendOrder["secret_key"] = tailorDetailsSession.secret_key;
							//dataToSendOrder["tailor_id"] = tailorDetailsSession.tailor_details_id;
							dataToSendOrder["customer_id"] = customer_id;
							dataToSendOrder["order_id"] = order_id;
							dataToSendOrder["order_price"] = total_price;
							dataToSendOrder["status"] = is_deleted;
							/*}else{
								dataToSendOrder["status"] = 2;
							}*/
							dataToSendOrder["order_attributes"] = $.parseJSON(JSON.stringify(option_selected));
							dataToSendOrder["order_measurements"] = $.parseJSON(JSON.stringify(order_data));
							dataToSendOrder["product_name"] = server_prod_name;
							dataToSendOrder["sync_date"] = sync_date_order;
							dataToSendOrder["sync_status"] = sync_status_order;
							dataToSendOrder['order_date'] = order_date;
							dataToSendOrder['order_delivery_date'] = order_delivery_date;
							
							if(sync_date_order == '' && parseInt(sync_status_order) == 0){
								//console.log('dataToSendOrder status 0  --- '+dataToSendOrder); // For Testing
								sendOrderDataToSaveInServer.push(dataToSendOrder);
								//console.log(JSON.stringify(sendOrderDataToSaveInServer)) // For Testing
							}else{
								//console.log('dataToSendOrder status 2  --- '+dataToSendOrder); // For Testing
								dataToSendOrder["id"] = order_server_id;
								sendOrderDataToUpdateInServer.push(dataToSendOrder);
								//console.log(JSON.stringify(sendOrderDataToUpdateInServer)) // For Testing
							}
							//sendOrderDataToServer.push(dataToSendOrder);
						}
					//}
					
					
					/*var appurltempsCustomer = '';
					if(sync_date_customer == '' && sync_status_customer == 0){
						appurltempsCustomer=appUrlMain+"api/customers/storejson"
					}else if(sync_date_customer != '' && sync_status_customer == 2){
						appurltempsCustomer=appUrlMain+"api/customers/updateJson"
					}
					$.ajax({
						type : ajaxCallPost,
						url: appurltempsCustomer,
						data : dataToSendCustomer,
						success: function(response)
						{
							console.log('Customer Updation After + ---------' + response);
							var outputResponse = JSON.stringifyresponse);
							console.log(outputResponse);
							var statusType = outputResponse['error'];
							if(statusType == false){
								db.transaction(	function (tx){
									if(sync_date_customer == '' && sync_status_customer == 0){
										var last_insert_id = outputResponse['last_insert_id'];
										tx.executeSql("UPDATE customer_details SET sync_date = '" + currDateTimestamp + ", sync_status = 1', cust_server_id = "+last_insert_id+" WHERE id = " + customer_id + "");
									}else if(sync_date_customer != '' && sync_status_customer == 2){
										tx.executeSql("UPDATE customer_details SET sync_date = '" + currDateTimestamp + ", sync_status = 3' WHERE id = " + customer_id + "");
									}
								});
							}
							//{"error":false,"last_insert_id":1,"message":"success"}
						},
						error:function(e){
							console.log('Error: ' + e);
						}
					});*/
					
					/*var appUrlOrder = '';
					if(sync_date_order == '' && sync_status_order == 0){
						appUrlOrder=appUrlMain+"api/orders/storejson"
					}else if(sync_date_order != '' && sync_status_order == 2){
						appUrlOrder=appUrlMain+"api/orders/updateJson"
					}
					$.ajax({
						type : ajaxCallPost,
						url: appUrlOrder,
						data : dataToSendOrder,
						success: function(response)
						{
							var outputResponse = JSON.stringify(response);
							var status = outputResponse['error'];
							if(status == false){
								db.transaction(	function (tx){
									if(sync_date_order == '' && sync_status_order == 0){
										var last_insert_id = outputResponse['last_insert_id'];
										tx.executeSql("UPDATE order_details SET sync_date = '" + currDateTimestamp + ", sync_status = 1', order_server_id = "+last_insert_id+" WHERE id = " + order_id + "");
									}else if(sync_date_order != '' && sync_status_order == 1){
										tx.executeSql("UPDATE order_details SET sync_date = '" + currDateTimestamp + ", sync_status = 3' WHERE id = " + order_id + "");
									}
								});
							}
						},
						error:function(e){
							console.log('Error: ' + e);
						}
					});*/
				}
				if(is_deleted != 0){
					tableRowMain += tableRow;
				}
			});
			
		}else{
			tableRowMain += '<tr><td colspan="7">No data found.</td></tr>'
		}
		$('#orderReportPageId').find('table tbody').append(tableRowMain);
		/*connectionType=checkConnection();
		if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 5G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
			if(((typeof $('#customerNameInput').val() != 'undefined') && $('#customerNameInput').val() != '') && ($('#newOrderId').val() != '' && (typeof $('#newOrderId').val() != 'undefined'))){
				gotoOrderPageDiv();
				sendCustomerDetailsToSaveInServer();
			}else{
				console.log('Came to if else block');
			}
		}*/
		gotoOrderPageDiv();
		//console.log(connectionType); // For Testing
		if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 5G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
			sendDataToServer();
			callServerToSaveCustDetailsIndex = 0;
			callServerToUpdateCustDetailsIndex = 0;
			callServerToSaveOrdDetailsIndex = 0;
			callServerToUpdateOrdDetailsIndex = 0;
			//sendDataToServerStatus = true;
		}
	}
	
	function deleteOrder(orderId, customerId){
		var isOK = confirm("Are you sure you want to delete this order?");
		if(isOK)
		{
			var currDateTimestamp="";
			currDateTimestamp=dateTimestamp();
			db.transaction(	function (tx){
				tx.executeSql('select * from customer_details where id ='+customerId ,[],function(tx,results){
					var len = 0;
					len = results.rows.length;
					if(len > 0){
						for (var i = 0; i < len; i++) {
							var syncStatus = results.rows.item(0)['sync_status'];
							var syncDate = results.rows.item(0)['sync_date'];
							if(syncDate != ''){
								tx.executeSql("UPDATE customer_details SET update_timestamp='"+currDateTimestamp+"', sync_status= 2, is_deleted=0  WHERE id=" + customerId + "");
							}else{
								tx.executeSql("UPDATE customer_details SET update_timestamp='"+currDateTimestamp+"', sync_status= 0, is_deleted=0  WHERE id=" + customerId + "");
							}
						}
					}
				},errorCBDeletingCustomerDB);
				tx.executeSql('select * from order_details where id ='+orderId ,[],function(tx,results){
					var len = 0;
					len = results.rows.length;
					if(len > 0){
						for (var i = 0; i < len; i++) {
							var syncStatus = results.rows.item(0)['sync_status'];
							var syncDate = results.rows.item(0)['sync_date'];
							if(syncDate != ''){
								tx.executeSql("UPDATE order_details SET update_timestamp='"+currDateTimestamp+"', sync_status= 2, is_deleted=0  WHERE id="+orderId+"");
							}else{
								tx.executeSql("UPDATE order_details SET update_timestamp='"+currDateTimestamp+"', sync_status= 0, is_deleted=0  WHERE id="+orderId+"");
							}
						}
					}
				},errorCBDeletingOrderDB);
			},errorCBDeletingOrderCustDB,successCBDeletingOrderCustDB);
		}
	}
	
	function errorCBDeletingCustomerDB(err){
		console.log('errorCBDeletingCustomerDB : '+err.code);
		console.log('errorCBDeletingCustomerDB : '+err.message);
	}
	
	function errorCBDeletingOrderDB(err){
		console.log('errorCBDeletingOrderDB : '+err.code);
		console.log('errorCBDeletingOrderDB : '+err.message);
	}

	function errorCBDeletingOrderCustDB(err){
		console.log('errorCBDeletingOrderCustDB : '+err.code);
		console.log('errorCBDeletingOrderCustDB : '+err.message);
	}

	function successCBDeletingOrderCustDB(){
		orderPageHtmlButton();
	}
	
	function viewOrderDetailsByOrderId(ordId){
		//console.log('viewOrderDetailsByOrderId --- ' +ordId); // For Testing
		db.transaction(function(tx) {
			tx.executeSql('select * from order_details where id = '+ordId, [], function(tx, results) {
				//console.log('viewOrderDetailsByOrderId --- ' +ordId); // For Testing
				var jsonOrderDataObj={};
				var order_id = results.rows.item(0)['id'];
				//console.log('viewOrderDetailsByOrderId --- ' +order_id);
				var cateOrdId = results.rows.item(0)['server_cat_id'];
				//console.log('viewOrderDetailsByOrderId --- ' +cateOrdId);
				var catOrdName = results.rows.item(0)['cat_name'];
				//console.log('viewOrderDetailsByOrderId --- ' +catOrdName);
				var prodOrdId = results.rows.item(0)['server_prod_id'];
				//console.log('viewOrderDetailsByOrderId --- ' +prodOrdId);
				var orderMeasuData = results.rows.item(0)['order_data'];
				//console.log('viewOrderDetailsByOrderId --- ' +orderMeasuData);
				var prodOrdName = results.rows.item(0)['server_prod_name'];
				//console.log('viewOrderDetailsByOrderId --- ' +prodOrdName);
				var customerOrdId = results.rows.item(0)['customer_id'];
				//console.log('viewOrderDetailsByOrderId --- ' +customerOrdId);
				var orderStatusOfPurchase = results.rows.item(0)['status_of_order'];
				//console.log('viewOrderDetailsByOrderId --- ' +orderStatusOfPurchase); // For Testing
				var optionSelectedOrder = results.rows.item(0)['option_selected'];
				var orderDate = results.rows.item(0)['order_date'];
				var orderDeliveryDate = results.rows.item(0)['order_delivery_date']
				//console.log('viewOrderDetailsByOrderId --- ' +optionSelectedOrder);
				$('#productNameToView').text(prodOrdName);
				tx.executeSql('select * from customer_details where id = '+customerOrdId, [], function(tx, resultsCus) {
					
					//console.log('viewOrderDetailsByOrderId --- Cust ' );
					
					var customerName = resultsCus.rows.item(0)['name'];
					//console.log('viewOrderDetailsByOrderId --- Cust ' +customerName);
					var priceOfProductCustomer = resultsCus.rows.item(0)['total_price'];
					//console.log('viewOrderDetailsByOrderId --- Cust ' +priceOfProductCustomer);
					//var customerAdvancePrice = results.rows.item(i)['advance_price'];
					var customerBalancePrice = resultsCus.rows.item(0)['balance_price'];
					//console.log('viewOrderDetailsByOrderId --- Cust ' +customerBalancePrice);
					var customerContactNumber = resultsCus.rows.item(0)['contact_number'];
					//console.log('viewOrderDetailsByOrderId --- Cust ' +customerContactNumber);
					var customerAddressOne = resultsCus.rows.item(0)['address_one'];
					//console.log('viewOrderDetailsByOrderId --- Cust ' +customerAddressOne);
					var customerAddressTwo = resultsCus.rows.item(0)['address_two'];
					//console.log('viewOrderDetailsByOrderId --- Cust ' +customerAddressTwo);
					var customerEmailId = resultsCus.rows.item(0)['email_id'];
					//console.log('viewOrderDetailsByOrderId --- Cust ' +customerEmailId);
					var country = resultsCus.rows.item(0)['country'];
					//console.log('viewOrderDetailsByOrderId --- Cust ' +country);
					var state = resultsCus.rows.item(0)['state'];
					//console.log('viewOrderDetailsByOrderId --- Cust ' +state);
					var city = resultsCus.rows.item(0)['city'];
					//console.log('viewOrderDetailsByOrderId --- Cust ' +city);
					var pincode = resultsCus.rows.item(0)['pincode'];
					//console.log('viewOrderDetailsByOrderId --- Cust ' +pincode);
					$('#view-order-details-Page #orderViewId').val(order_id);
					$('#view-order-details-Page #customerViewId').val(customerOrdId);
					$('#view-order-details-Page #customerNameOrderInput').val(customerName);
					$('#view-order-details-Page #totalPriceOrderInput').val(priceOfProductCustomer);
					$('#view-order-details-Page #balancePriceOrderInput').val(customerBalancePrice);
					$('#view-order-details-Page #contactNumberOrderInput').val(customerContactNumber);
					$('#view-order-details-Page #emailIdOrderInput').val(customerEmailId);
					$('#view-order-details-Page #address1OrderInput').val(customerAddressOne);
					$('#view-order-details-Page #address2OrderInput').val(customerAddressTwo);
					$('#view-order-details-Page #stateOrderInput').val(state);
					$('#view-order-details-Page #cityOrderInput').val(city);
					$('#view-order-details-Page #pincodeOrderInput').val(pincode);
					$("#view-order-details-Page #orderStatusIdInput").val(orderStatusOfPurchase);
					$('#view-order-details-Page #orderDateOrderInput').val(orderDate);
					$('#view-order-details-Page #orderDeliveryDateOrderInput').val(orderDeliveryDate);
					
					
					//console.log('orderViewId : '+$('#view-order-details-Page #orderViewId').val());
					//console.log('customerViewId : '+$('#view-order-details-Page #customerViewId').val());
					//console.log('customerNameOrderInput : '+$('#view-order-details-Page #customerNameOrderInput').val());
					//console.log('balancePriceOrderInput : '+$('#view-order-details-Page #balancePriceOrderInput').val());
					//console.log('totalPriceOrderInput : '+$('#view-order-details-Page #totalPriceOrderInput').val());
					//console.log('contactNumberOrderInput : '+$('#view-order-details-Page #contactNumberOrderInput').val());
					//console.log('emailIdOrderInput : '+$('#view-order-details-Page #emailIdOrderInput').val());
					
					//console.log('address2OrderInput : '+$('#view-order-details-Page #address2OrderInput').val());
					//console.log('address1OrderInput : '+$('#view-order-details-Page #address1OrderInput').val());
					//console.log('stateOrderInput : '+$('#view-order-details-Page #stateOrderInput').val());
					//console.log('cityOrderInput : '+$('#view-order-details-Page #cityOrderInput').val());
					//console.log('pincodeOrderInput : '+$('#view-order-details-Page #pincodeOrderInput').val());
					
				});
				//console.log('viewOrderDetailsByOrderId --- CustOut ');
				var measurementOrderData = jQuery.parseJSON(orderMeasuData);
				//console.log('viewOrderDetailsByOrderId --- CustOut '+measurementOrderData);
				var mainTbodyForOrderMeasData = '';
				var i = 0;
				
				var optionSelectedOrderData = jQuery.parseJSON(optionSelectedOrder);
				
				jQuery.each(measurementOrderData, function(indexObj,valueObj) {
					//console.log('viewOrderDetailsByOrderId --- Inside forloop '+valueObj);
					var measNameForField  = valueObj['measName'];
					var measPriKeyForField = valueObj['measPKId'];
					var measinputValue = valueObj['inputValue'];
					var groupFieldsName = '<tr><td class="measOrder-inputField">'+measNameForField+'</td>'
					+'<td class="measOrder-inputField">';
					if(parseInt(orderMeasurementDiv) != 0){
						groupFieldsName += '<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset">';
					}
					groupFieldsName +='<input type="text" value="'+measinputValue+'" class="form-control meas-ind-cust'+i+'" data-meas_cust_name="'+measNameForField+'" data-meas_cust_pkid="'+measPriKeyForField+'" id="measFieldcust'+measPriKeyForField+'"'+'name="measFieldcust'+measPriKeyForField+'">';
					if(parseInt(orderMeasurementDiv) != 0){
						groupFieldsName += '</div>';
					}
					groupFieldsName += '</td></tr>';
					mainTbodyForOrderMeasData += groupFieldsName;
					i = parseInt(i) + 1;
				});
				//selectedOptionMain.optionArray
				//console.log("optionSelectedOrderData['optionArray'] : "+optionSelectedOrderData['optionArray']);
				var imageAppendDiv = '';
				jQuery.each(optionSelectedOrderData['optionArray'], function(indexObj,valueObj){
					var imageName = valueObj['imageName'];
					var optionName = valueObj['optName'];
					if(imageName != undefined && optionName != undefined){
						var imagePath = localPath + '/' + 'attributes'+ '/' + imageName;
						imageAppendDiv += '<img alt="'+optionName+'" src="'+imagePath+'" class="append-edit-page-option">';
					}
				});
				$('#appendOptionInEditPage').empty();
				$('#appendOptionInEditPage').append(imageAppendDiv);
				$('.appendMeasuOrderCustomerList').empty();
				$('.appendMeasuOrderCustomerList').append(mainTbodyForOrderMeasData);
				orderMeasurementDiv = parseInt(orderMeasurementDiv)+1;
				gotoViewOrderDetails();
			});
		});
	}
	
	
	var customerDetailsJson = new Object();
	var orderDetailsJson = new Object();
	var selectedStatusOfOrder = '';
	function updateCustomerOrderDetails(){
		var updateMeasurementData = [];
		var orderIdToUpdate = $('#orderViewId').val();
		orderDetailsJson['orderId'] = orderIdToUpdate;
		var customerIdToUpdate = $('#customerViewId').val();
		//console.log('customerIdToUpdate '+customerIdToUpdate);
		var customerName = $('#customerNameOrderInput').val();
		//console.log('customerName '+customerName);
		var totalPriceOrder = $('#totalPriceOrderInput').val();
		//console.log('totalPriceOrder '+totalPriceOrder);
		var balancePriceOrder = $('#balancePriceOrderInput').val();
		//console.log('balancePriceOrder '+balancePriceOrder);
		var contactNumberOrder = $('#contactNumberOrderInput').val();
		//console.log('contactNumberOrder '+contactNumberOrder);
		var emailIdOrder = $('#emailIdOrderInput').val();
		//console.log('emailIdOrder '+emailIdOrder);
		var address1Order = $('#address1OrderInput').val();
		//console.log('address1Order '+address1Order);
		var address2Order = $('#address2OrderInput').val();
		
		var orderDate = $('#orderDateOrderInput').val();
		var orderDeliveryDate = $('#orderDeliveryDateOrderInput').val();
		orderDetailsJson['order_date'] = orderDate;
		orderDetailsJson['order_delivery_date'] = orderDeliveryDate;
		//console.log('address2Order '+address2Order);
		
		var stateOrder = $('#stateOrderInput').val();
		//console.log('stateOrder '+stateOrder);
		
		var cityOrder = $('#cityOrderInput').val();
		//console.log('cityOrder '+cityOrder);
		
		var pincodeOrder = $('#pincodeOrderInput').val();
		selectedStatusOfOrder = $('#orderStatusIdInput').val();
		//console.log('pincodeOrder '+pincodeOrder);
		
		customerDetailsJson['customerId'] = customerIdToUpdate;
		customerDetailsJson['customerName'] = customerName;
		customerDetailsJson['totalPrice'] = totalPriceOrder;
		customerDetailsJson['balancePrice'] = balancePriceOrder;
		customerDetailsJson['contactNumber'] = contactNumberOrder;
		customerDetailsJson['emailId'] = emailIdOrder;
		customerDetailsJson['address1'] = address1Order;
		customerDetailsJson['address2'] = address2Order;
		customerDetailsJson['state'] = stateOrder;
		customerDetailsJson['city'] = cityOrder;
		customerDetailsJson['pincode'] = pincodeOrder;
		
		var lengthOfOrder = $( "#view-order-details-Page .appendMeasuOrderCustomerList .measOrder-inputField" ).length;
		//console.log(lengthOfOrder);
		if(lengthOfOrder > 0){
			var arrObject= [];
			for(var i = 0; i<lengthOfOrder; i++){
				var childObject = new Object();
				var measPKId = $('.meas-ind-cust'+i).data('meas_cust_pkid');
				var measName = $('.meas-ind-cust'+i).data('meas_cust_name');
				var inputValue = $('#measFieldcust'+measPKId).val();
				if(measPKId != undefined  && measPKId != 'undefined'){
					childObject.measPKId = measPKId;
					childObject.measName = measName;
					childObject.inputValue = inputValue;
					//console.log('measPKId : '+measPKId + ' measName : '+measName + 'inputValue : '+inputValue); // For Testing
					arrObject.push(childObject);
				}
			}
			updateMeasurementData = arrObject;
			//console.log('updateMeasurementData : '+JSON.stringify(updateMeasurementData)); // For Testing
			orderDetailsJson['measurementData'] = updateMeasurementData;
			
		}
		
		
		
		/*db.transaction(function(tx) {
			var currDateTimestamp="";
			currDateTimestamp=dateTimestamp();
			//console.log('update');
			tx.executeSql("UPDATE customer_details SET name = '" + customerName + ", update_timestamp = '"+currDateTimestamp+"', address_two = '"+address2Order+"', address_one = '"+address1Order+"', sync_status = 2', pincode = '"+pincodeOrder+"', city = '"+cityOrder+"', state = '"+stateOrder+"', total_price = '"+totalPriceOrder+"', balance_price = '"+balancePriceOrder+"', contact_number = '"+contactNumberOrder+"', email_id = '"+emailIdOrder+"'  WHERE id = " + customerIdToUpdate + "");
			tx.executeSql("UPDATE order_details SET order_data = '" + updateMeasurementData + ", update_timestamp = '"+currDateTimestamp+"', sync_status = 2 WHERE id = " + orderIdToUpdate + "");
		});*/
		//showModal();
		//console.log('dataIsFromServer : '+dataIsFromServer);
		//orderPageHtmlButton();
		//gotoProductPage();
		updateCustomerDetailsInLocalDB(customerDetailsJson);
		
	}
	
	/*function updateCustomerDetailsInLocalDB(customerDetailsJson){
		
	}*/
	var callServerToSaveCustDetailsIndex = 0;
	var callServerToUpdateCustDetailsIndex = 0;
	var callServerToSaveOrdDetailsIndex = 0;
	var callServerToUpdateOrdDetailsIndex = 0;
	function sendDataToServer(){
		if(sendCustomerDataToSaveInServer.length > 0){
			if(callServerToSaveCustDetailsIndex == 0){
				sendCustomerDetailsToSaveInServer();
				callServerToSaveCustDetailsIndex++;
			}
		}else if(sendCustomerDataToUpdateInServer.length > 0){
			if(callServerToUpdateCustDetailsIndex == 0){
				sendCustomerDetailsToUpdateInServer();
				callServerToUpdateCustDetailsIndex++;
			}
			
		}else if(sendOrderDataToSaveInServer.length > 0){
			if(callServerToSaveOrdDetailsIndex == 0){
				sendOrderDetailsToSaveInServer();
				callServerToSaveOrdDetailsIndex++;
			}
		}else if(sendOrderDataToUpdateInServer.length > 0){
			if(callServerToUpdateOrdDetailsIndex == 0){
				sendOrderDetailsToUpdateInServer();
				callServerToUpdateOrdDetailsIndex++;
			}
		}else if(sendOrderDataToSaveInServer.length == 0 && sendOrderDataToUpdateInServer.length == 0 && sendCustomerDataToSaveInServer.length == 0
				&& sendCustomerDataToUpdateInServer.length == 0){
			sendCustomerDataToUpdateInServer = [];
			sendCustomerDataToSaveInServer = [];
			sendOrderDataToSaveInServer = [];
			sendOrderDataToUpdateInServer = [];
			callServerToSaveCustDetailsIndex = 0;
			callServerToUpdateCustDetailsIndex = 0;
			callServerToSaveOrdDetailsIndex = 0;
			callServerToUpdateOrdDetailsIndex = 0;
			//sendDataToServerStatus = false;
		}
	}
	
	// Send Data to Server
	function sendCustomerDetailsToSaveInServer(){
		var dataToSend = {};
		dataToSend["secret_key"] = tailorDetailsSession.secret_key;
		dataToSend["tailor_id"] = tailorDetailsSession.tailor_details_id;
		dataToSend["uuid"] = mobileUUID;
		dataToSend["customers"] = JSON.stringify(sendCustomerDataToSaveInServer);
		//console.log(sendCustomerDataToSaveInServer); // For Testing
		//console.log(dataToSend); // For Testing
		var appurltemps=appUrlMain+"api/customers/storejson"
		connectionType=checkConnection();
		if(connectionType=="Unknown connection" || connectionType=="No network connection"){
			//navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
		else if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
			$.ajax({
				type : ajaxCallPost,
				url: appurltemps,
				data : dataToSend,
				success: successCBCustomerDetailsSaveFn,
				error: errorFromServer
			});
		}
		else{
			//navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
	}
	
	function successCBCustomerDetailsSaveFn(data){
		//console.log(data); // For Testing
		var responseJson = $.parseJSON(JSON.stringify(data));
		if(responseJson['error'] == true){
			alert(responseJson['message']);
		}else{
			updateCustomerDetailsForSavedData = responseJson;
			//alert('dataparse : '+$.parseJSON(tailorDetailsJsonData));
			//alert('tailorDetailsJsonData : '+tailorDetailsJsonData);
			// FIXME CHECK JSON DATA
			db.transaction(updateCustomerDetailsForSaveFn, errorCBCustomerDetails, successCBCustomerDetailsLBSaveFn);
			
		}
	}
	
	function updateCustomerDetailsForSaveFn(tx) {
		var currDateTimestamp="";
		currDateTimestamp=dateTimestamp();
		/*jQuery.each(updateCustomerDetailsForSavedData, function(index,value) {
			var customer_id = value['id'];
			var last_insert_id = value['last_insert_id'];
			tx.executeSql("UPDATE customer_details SET update_timestamp='"+currDateTimestamp+"', sync_date = '" + currDateTimestamp + ", sync_status = 1', cust_server_id = "+last_insert_id+" WHERE id = " + customer_id + "");
		});*/
		var serverCustomerIdArray = [];
		var localCustomerIdArray = [];
		serverCustomerIdArray = updateCustomerDetailsForSavedData['last_insert_id'];
		localCustomerIdArray = updateCustomerDetailsForSavedData['app_customer_id'];
		if(serverCustomerIdArray.length == localCustomerIdArray.length){
			for(var i = 0; i < serverCustomerIdArray.length; i++){
				var customerIdObject = localCustomerIdArray[i];
				var serverCustomerIdObject = serverCustomerIdArray[i];
				var customer_id = customerIdObject['app_customer_id'];
				var last_insert_id = serverCustomerIdObject['last_insert_id'];
				tx.executeSql("UPDATE customer_details SET update_timestamp='"+currDateTimestamp+"', sync_date='"+currDateTimestamp+"', sync_status=1, cust_server_id="+last_insert_id+" WHERE id="+customer_id+"");
			}
		}else{
			alert('Please contact your administrator');
		}
	}

	
	function sendCustomerDetailsToUpdateInServer(){
		var dataToSend = {};
		
		dataToSend["secret_key"] = tailorDetailsSession.secret_key;
		dataToSend["tailor_id"] = tailorDetailsSession.tailor_details_id;
		dataToSend["uuid"] = mobileUUID;
		dataToSend["customers"] = JSON.stringify(sendCustomerDataToUpdateInServer);
		
		var appurltemps=appUrlMain+"api/customers/updateJson"
		connectionType=checkConnection();
		if(connectionType=="Unknown connection" || connectionType=="No network connection"){
			//navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
		else if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
			$.ajax({
				type : ajaxCallPost,
				url: appurltemps,
				data : dataToSend,
				success: successCBCustomerDetailsUpdateFn,
				error: errorFromServer
			});
		}
		else{
			//navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
	}
	
	function successCBCustomerDetailsUpdateFn(data){
		//console.log(data); // For Testing
		var responseJson = $.parseJSON(JSON.stringify(data));
		if(responseJson['error'] == true){
			alert(responseJson['message']);
		}else{
			updateCustomerDetailsForUpdatedData = responseJson;
			//alert('dataparse : '+$.parseJSON(tailorDetailsJsonData));
			//alert('tailorDetailsJsonData : '+tailorDetailsJsonData);
			// FIXME CHECK JSON DATA
			console.log();
			db.transaction(updateCustomerDetailsForUpdateFn, errorCBCustomerDetails, successCBCustomerDetailsLBUpdateFn);
		}
	}
	
	function errorCBCustomerDetails(err){
		//sendDataToServerStatus = false;
		console.log('errorCBCustomerDetails : '+err.code);
		console.log('errorCBCustomerDetails : '+err.message);
	}
	
	function successCBCustomerDetailsLBSaveFn(){
		//console.log('successCBCustomerDetailsLBSaveFn'); // For Testing
		sendCustomerDataToSaveInServer = [];
		dataHasSyncSendReport('customers_sync');
		sendDataToServer();
	}
	
	function successCBCustomerDetailsLBUpdateFn(){
		//console.log('successCBCustomerDetailsLBUpdateFn');  // For Testing
		sendCustomerDataToUpdateInServer = [];
		dataHasSyncSendReport('customers_sync');
		sendDataToServer();
	}
	
	function updateCustomerDetailsForUpdateFn(tx) {
		var currDateTimestamp="";
		currDateTimestamp=dateTimestamp();
		
		var serverCustomerIdArray = [];
		var localCustomerIdArray = [];
		serverCustomerIdArray = updateCustomerDetailsForUpdatedData['last_insert_id'];
		localCustomerIdArray = updateCustomerDetailsForUpdatedData['app_customer_id'];
		if(serverCustomerIdArray.length == localCustomerIdArray.length){
			for(var i = 0; i < serverCustomerIdArray.length; i++){
				var customerIdObject = localCustomerIdArray[i];
				var serverCustomerIdObject = serverCustomerIdArray[i];
				var customer_id = customerIdObject['app_customer_id'];
				var last_insert_id = serverCustomerIdObject['last_insert_id'];
				tx.executeSql("UPDATE customer_details SET update_timestamp='"+currDateTimestamp+"', sync_date='"+currDateTimestamp+"', sync_status=1, cust_server_id="+last_insert_id+" WHERE id="+customer_id+"");
			}
		}else{
			alert('Please contact your administrator');
		}
	}
	
	function sendOrderDetailsToSaveInServer(){
		var dataToSend = {};
		
		dataToSend["secret_key"] = tailorDetailsSession.secret_key;
		dataToSend["tailor_id"] = tailorDetailsSession.tailor_details_id;
		dataToSend["uuid"] = mobileUUID;
		dataToSend["orders"] = JSON.stringify(sendOrderDataToSaveInServer);
		//console.log(dataToSend); // For Testing
		var appurltemps=appUrlMain+"api/orders/storejson"
		connectionType=checkConnection();
		if(connectionType=="Unknown connection" || connectionType=="No network connection"){
			//navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
		else if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
			$.ajax({
				type : ajaxCallPost,
				url: appurltemps,
				data : dataToSend,
				success: successCBOrderDetailsSaveFn,
				error: errorFromServer
			});
		}
		else{
			//navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
	}
	
	function successCBOrderDetailsSaveFn(data){
		//console.log(data); // For Testing
		var responseJson = $.parseJSON(JSON.stringify(data));
		if(responseJson['error'] == true){
			alert(responseJson['message']);
		}else{
			updateOrderDetailsForSavedData = responseJson;
			//alert('dataparse : '+$.parseJSON(tailorDetailsJsonData));
			//alert('tailorDetailsJsonData : '+tailorDetailsJsonData);
			// FIXME CHECK JSON DATA
			db.transaction(updateOrderDetailsForSavedFn, errorCBOrderDetails, successCBOrderDetailsForSavedFn);
			
		}
	}
	
	function errorCBOrderDetails(err){
		//sendDataToServerStatus = false;
		console.log('errorCBOrderDetails : '+err.code);
		console.log('errorCBOrderDetails : '+err.message);
	}
	
	function successCBOrderDetailsForSavedFn(){
		//console.log('successCBOrderDetailsForSavedFn');
		sendOrderDataToSaveInServer = [];
		dataHasSyncSendReport('orders_sync');
		sendDataToServer();
	}
	
	function successCBOrderDetailsForUpdateFn(){
		//console.log('successCBOrderDetailsForUpdateFn');
		sendOrderDataToUpdateInServer = [];
		dataHasSyncSendReport('orders_sync');
		sendDataToServer();
	}
	
	function updateOrderDetailsForSavedFn(tx) {
		var currDateTimestamp="";
		currDateTimestamp=dateTimestamp();
		var serverOrderIdArray = [];
		var localOrderIdArray = [];
		serverOrderIdArray = updateOrderDetailsForSavedData['last_insert_id'];
		localOrderIdArray = updateOrderDetailsForSavedData['app_order_id'];
		if(serverOrderIdArray.length == localOrderIdArray.length){
			for(var i = 0; i < serverOrderIdArray.length; i++){
				var orderIdObject = localOrderIdArray[i];
				var serverOrderIdObject = serverOrderIdArray[i];
				var orderId = orderIdObject['app_order_id'];
				var serverOrderId = serverOrderIdObject['last_insert_id'];
				tx.executeSql("UPDATE order_details SET update_timestamp='"+currDateTimestamp+"', sync_date='"+currDateTimestamp+"', sync_status=1, order_server_id="+serverOrderId+" WHERE id="+orderId+"");
			}
		}else{
			alert('Please contact your administrator');
		}
		/*jQuery.each(updateOrderDetailsForSavedData, function(index,value) {
			var orderId = value['id'];
			var last_insert_id = value['last_insert_id'];
			tx.executeSql("UPDATE order_details SET update_timestamp='"+currDateTimestamp+"', sync_date = '" + currDateTimestamp + ", sync_status = 1', order_server_id = "+last_insert_id+" WHERE id = " + orderId + "");
		});*/
	}
	
	function successCBOrderDetailsFn(data){
		
		/*console.log('successCBOrderDetailsFn');
		$('#prodHtmlName').val('');
		$('#prodHtmlId').val('');
		$('#categoryHtmlId').val('');
		$('#customerIdInput').val('');
		$('#newOrderId').val('');
		$('#customerNameInput').val('');
		$('#priceInput').val('');
		$('#contactNumberInput').val('');
		$('#addressInput').val('');
		gotoOrderPageDiv();*/
	}
	
	function sendOrderDetailsToUpdateInServer(){
		var dataToSend = {};
    	
    	dataToSend["secret_key"] = tailorDetailsSession.secret_key;
		dataToSend["tailor_id"] = tailorDetailsSession.tailor_details_id;
		dataToSend["uuid"] = mobileUUID;
		dataToSend["orders"] = JSON.stringify(sendOrderDataToUpdateInServer);
		//console.log('sendOrderDetailsToUpdateInServer data '+sendOrderDataToUpdateInServer); // For Testing
		//console.log('dataToSend Order '+JSON.stringify(dataToSend)); // For Testing
		
		/*dataToSend["customer_id"] = $('#customerIdInput').val();
		dataToSend["order_id"] = $('#newOrderId').val();
		dataToSend["order_price"] = $('#priceInput').val();
		dataToSend["status"] = 1;
		dataToSend["order_attributes"] = selectedOptionMain;
		dataToSend["order_measurements"] = orderTakenDetails;
		dataToSend["product_name"] = $('#prodHtmlName').val();*/
		var appurltemps=appUrlMain+"api/orders/updateJson"
		connectionType=checkConnection();
		if(connectionType=="Unknown connection" || connectionType=="No network connection"){
			//navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
		else if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
			$.ajax({
				type : ajaxCallPost,
				url: appurltemps,
				data : dataToSend,
				success: successCBOrderDetailsUpdatedFn,
				error: errorFromServer
			});
		}
		else{
			//navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
	}
	
	function errorFromServer(data){
		console.log(appRequiresWiFi);
	}
	
	function successCBOrderDetailsUpdatedFn(data){
		//console.log(data); // For Testing
		var responseJson = $.parseJSON(JSON.stringify(data));
		if(responseJson['error'] == true){
			alert(responseJson['message']);
		}else{
			updateOrderDetailsForUpdatedData = responseJson;
			//alert('dataparse : '+$.parseJSON(tailorDetailsJsonData));
			//alert('tailorDetailsJsonData : '+tailorDetailsJsonData);
			// FIXME CHECK JSON DATA
			db.transaction(updateOrderDetailsForUpdatedFn, errorCBOrderDetails, successCBOrderDetailsForUpdateFn);
			
		}
	}
	
	function updateOrderDetailsForUpdatedFn(tx) {
		var currDateTimestamp="";
		currDateTimestamp=dateTimestamp();
		var serverOrderIdArray = [];
		var localOrderIdArray = [];
		serverOrderIdArray = updateOrderDetailsForUpdatedData['last_insert_id'];
		localOrderIdArray = updateOrderDetailsForUpdatedData['app_order_id'];
		if(serverOrderIdArray.length == localOrderIdArray.length){
			for(var i = 0; i < serverOrderIdArray.length; i++){
				var orderIdObject = localOrderIdArray[i];
				var serverOrderIdObject = serverOrderIdArray[i];
				var orderId = orderIdObject['app_order_id'];
				var serverOrderId = serverOrderIdObject['last_insert_id'];
				tx.executeSql("UPDATE order_details SET update_timestamp='"+currDateTimestamp+"', sync_date='"+currDateTimestamp+"', sync_status=1, order_server_id="+serverOrderId+" WHERE id="+orderId+"");
			}
		}else{
			alert('Please contact your administrator');
		}
		
		
		/*jQuery.each(updateOrderDetailsForUpdatedData, function(index,value) {
			var orderId = value['id'];
			var last_insert_id = value['last_insert_id'];
			tx.executeSql("UPDATE order_details SET update_timestamp='"+currDateTimestamp+"', sync_date = '" + currDateTimestamp + ", sync_status = 1', order_server_id = "+last_insert_id+" WHERE id = " + orderId + "");
		});*/
	}
	
	// To save File Function
	function gotFS(fileSystem) {
		store = cordova.file.dataDirectory;
		//console.log('store location : '+ store + 'ApplicationDirectory : '+cordova.file.applicationDirectory);
		window.appRootDirName = "tailorrani";
		onRequestFileSystemSuccess(fileSystem);
	    // save the file system for later access
	    //console.log(fileSystem.root.fullPath);
	    window.fileSystem = fileSystem;
	    window.rootFS = fileSystem.root;
	    //console.log('window.rootFS : '+window.rootFS);
	    fileSystem.root.getDirectory(window.appRootDirName, {
            create: true,
            exclusive: false
        }, dirReady, fail);
	}
	
	function onRequestFileSystemSuccess(fileSystem) { 
        var entry=fileSystem.root; 
        entry.getDirectory("tailorrani", {create: true, exclusive: false}, onGetDirectorySuccess, onGetDirectoryFail); 
	} 
	
	function onGetDirectorySuccess(dir) { 
	      //console.log("Created dir "+dir.name); 
	} 

	function onGetDirectoryFail(error) { 
	     console.log("Error creating directory "+error.code); 
	} 
	
	function dirReady(entry) {
        window.appRootDir = entry;
        console.log('window.appRootDir'+window.appRootDir);
        console.log('window.appRootDir FullPath'+window.appRootDir.fullPath);
        console.log("application dir is ready");
    }
	// Kishore Commented
	
	//window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem; // Kishore Added
    //window.requestFileSystem(LocalFileSystem.TEMPORARY, 0, gotFS, fail); // Kishore Added
	
	function downloadFile(imageId, imageName, imageType) {
        var url = '';
        if(imageType == 'product'){
        	url = productImageData + '/' + imageName;
        }else if(imageType == 'attrOption'){
        	url = attributeImageData + '/'+ imageName;
        }
        var filePath = '';
        if(imageType == 'product'){
        	filePath = '/' + imageId +'_'+ imageName;
        }else if(imageType == 'attrOption'){
        	filePath = '/' + imageId +'_' + imageName;
        }
        
        var filepathToStore='file:///storage/sdcard0/'+ 'tailorrani/' + filePath;
        filetransferFn(url,filepathToStore);
    }
	
	function downloadFileTestFn(type) {
		var File_Name='product_5_582ea8c053c3b.jpg';
		var URL=appUrlMain+'images\/Products\/product_image' + '/' + File_Name;
		var Folder_Name="galleryTest";
		downloadFileValidatorFn(URL, Folder_Name, File_Name, type);
	}
	
	//First step check parameters mismatch and checking network connection if available call    download function
	function downloadFileValidatorFn(URL, Folder_Name, File_Name, type, typeId, downloadType) {
		//Parameters mismatch check
		if (URL == null && Folder_Name == null && File_Name == null) {
			return;
		}
		else {
			//checking Internet connection availablity
			connectionType = checkConnection();
			if(connectionType=="Unknown connection" || connectionType=="No network connection"){
				alert('Please check the internet connection or internet is very slow.');
			}
			else {
				downloadFileFn(URL, Folder_Name, File_Name, type, typeId, downloadType); //If available download function call
			}
		}
	}
	var folderPath = '';
	var folderAndPath;
	var downloadLinkGlobalTest;
	// 2nd Step 
	function downloadFileFn(URL, Folder_Name, File_Name, imageId, typeId, downloadType) {
		//step to request a file system 
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemSuccess, fileSystemFail);
		var uniqueId = '';
		function fileSystemSuccess(fileSystem) {
			var download_link = encodeURI(URL);
			ext = download_link.substr(download_link.lastIndexOf('.') + 1); //Get extension of URL
			downloadLinkGlobalTest = download_link;
			var rootdir11 = fileSystem.root;
			
			var directoryEntry = fileSystem.root; // to get root path of directory
			directoryEntry.getDirectory(Folder_Name, { create: true, exclusive: false }, onDirectorySuccess, onDirectoryFail); // creating folder in sdcard
			
			store = cordova.file.dataDirectory;
			
			//var fp = rootdir.fullPath; // Returns Fulpath of local directory
			folderAndPath = Folder_Name + '/' + File_Name;
			var fileDataDirect = store + "/" + folderAndPath; // fullpath and name of the file which we want to give
			uniqueId = Folder_Name+imageId;
			// download function call
			connectionType = checkConnection();
			if(connectionType=="Unknown connection" || connectionType=="No network connection"){
				alert('Please check the internet connection or internet is very slow.');
			}
			else {
				console.log('Internet connection : '+connectionType);
				filetransferFn(download_link, fileDataDirect, File_Name, uniqueId, typeId, Folder_Name, imageId, downloadType);
			}
		}

		function onDirectorySuccess(parent) {
			// Directory created successfuly
			console.log("onDirectorySuccess");
		}

		function onDirectoryFail(error) {
			//Error while creating directory
			console.log("Unable to create new directory: " + error.code);
		}

		function fileSystemFail(evt) {
			//Unable to access file system
			console.log(evt.target.error.code);
		}
	}
	
	// 3rd Step 
	var removeProgressId = '';
	var completedCountImg=0;
	function filetransferFn(download_link, fp, File_Name, id, typeId, Folder_Name, imageId, downloadType) {
		var fileTransfer = new FileTransfer();
		//console.log(fp);
		// File download function with URL and local path
		removeProgressId = 'remove'+id;
		/*var progressBarTag = '<div class="confirmClass" id="remove'+id+'">';
		//progressBarTag += '<button type="button" data-prod_id="'+typeId+'" class="btn btn-primary st-bg-baby-pink ui-btn ui-shadow ui-corner-all '+id+'" data-filename="'+File_Name+'" data-uniqueid="'+id+'" data-urllink="'+download_link+'" onclick="startPauseResumeDownload(this);" data-location="'+fp+'">Re-download</button>';
		progressBarTag += '</div>';*/
    	//$('#container'+typeId).append(progressBarTag).enhanceWithin();
		fileTransfer.download(download_link, fp,
				function (entry) {
			//localPath = entry.toURL();
			console.log("download toURL: " + entry.toURL());
			if(downloadType == 1){
				if(Folder_Name == 'gallery'){
					$('.gallCIndClassId'+imageId).attr('src',entry.toURL());
					$('.product-img'+imageId).attr('src',entry.toURL());
				}else if(Folder_Name == 'attributes'){
					$('.attrImageReset'+imageId).attr('src',entry.toURL());
				}
			}
			//updateProgress(100, id);
			/* $('#remove'+File_Name).remove();
			if($('#progressBarDiv > div' ).lenght==0){
				gotoProductPage();
			} */
			window.resolveLocalFileSystemURL(entry.toURL(), fileExist, fileNotExist);
			
			if(Folder_Name == 'attributes'){
				changeStatusOfAttrImages(imageId);
			}else if(Folder_Name == 'gallery'){
				changeStatusOfGalleryImages(imageId);
			}
			
			
			//checkIfFileExists(entry.toURL());
			//count = parseInt(count)+1;
			
			// Product Count Check
			if(prodImgCountInProg>0 && window.localStorage["productimgflag"]==1){
				prodImgCountDownloaded=prodImgCountDownloaded+1;
				if(prodImgCountInProg==prodImgCountDownloaded ){
					window.localStorage["productimgflag"]=2;
					// For Testing
					alert('All Product Images Downloaded Successfully. ' + window.localStorage["productimgflag"]);
				}
			}
		},
		function (error) {
			//Download abort errors or download failed errors
			console.log("download error source " + error.source);
			console.log("download error target " + error.target);
			console.log("upload error code" + error.code);
		}
		);
		
		fileTransfer.onprogress = function(progress) {
		    /*console.log(progress.loaded, progress.total);*/
		    if (this.pre === undefined) this.pre = 0;
		    
		    var now = ~~((progress.loaded / progress.total) * 100 * 100);
		    if (now - +this.pre > 17) {
		    	/*var tempDiv = '<div id="'+File_Name+'">'+
		    			tempDiv += '<span>File Name : "'+File_Name+'" </span>'
		    			+' Percentage : '+now/100+'%</div>';*/
		    	
		        updateProgress(now / 100, id, typeId);
		        
		        if(parseInt(now/100) == 100){
		        	completedCountImg+=1;
		        	var idRemove='#remove'+id;
		        	var btnText = $('.downloadProductList p').text();
		        	$('.downloadProductList #'+typeId).find('span').html(completedCountImg);
			      //  console.log('Removed Div : ----- '+id+'----' +$('#container'+typeId).find(idRemove).html());
			       // $('#container'+typeId).find(idRemove).remove();
			        /*if($('#container'+typeId).find('.confirmClass').length == 0){
			        	$('#container'+typeId).find('button').text('Completed');
			        	hideModal();
			        	$('#container'+typeId+' #removeBackButton').remove();
			        	$('#container'+typeId).append('<div class="removeBackButton"><button class="btn btn-primary st-bg-baby-pink ui-btn ui-shadow ui-corner-all" onclick="gotoProductPage();" >Back to Product Page</button></div>');
			        }*/
		        }
		       
		        this.pre = now;
		    }
		}
	}
	
	function updateProgress(data, id, typeId) {
	  /*  if (this.progress === undefined) this.progress = $('progress'); //store progress
	    this.progress.setAttribute('style', 'width: ' + data + '%');
	    this.progress.innerHTML = data + "%";*/
		$('#container'+typeId).find('.'+id).val(data);
	}
	
	function removeFileFromLocal(thisData){
		var isOK = confirm("Are you really want to Remove?");
		if(isOK)
		{
			var serverURL = $(thisData).data('urllink');
		    var filePathDestination = $(thisData).data('location');
		    var id = $(thisData).data('uniqueid');
		    var fileName = $(thisData).data('filename');
		    
		    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
		        fileSystem.root.getFile(filePathDestination, {create:false}, function(fileEntry){
		            fileEntry.remove(function(file){
		                console.log("File removed!");
		            },function(){
		                console.log("error deleting the file " + error.code);
		                });
		            },function(){
		                console.log("file does not exist");
		            });
		        },function(evt){
		            console.log(evt.target.error.code);
		    });
		    
		    var idRemove='#remove'+id;
       	 	console.log('Removed Div : ----- '+id+'----' +$('#progressBarDiv').find(idRemove).html());
	       /* $('#progressBarDiv').find('#remove'+id).remove();*/
	        $('#progressBarDiv').find(idRemove).remove();
		    
		}
		
	}
	
	function startPauseResumeDownload(thisData) {
		var isOK = confirm("Are you really want to Re-download?");
		if(isOK)
		{
			
			    var fileTransfer = new PRD(); // Use PRD ( extended cordova-plugin-pause-resume-download )
			    var serverURL = $(thisData).data('urllink');
			    var filePathDestination = $(thisData).data('location');
			    var id = $(thisData).data('uniqueid');
			    var fileName = $(thisData).data('filename');
			    var typeId = $(thisData).data('prod_id');
			    
			    
			    downloadProdImage(typeId);
		}
	   
	}

	function reloadAll() {
	    window.location.reload();
	}
	
	function fileNotExist(e) {
	    console.log("File not exist");
	    console.dir(e);
	}
	
	function fileExist(fileEntry) {
		console.log('File Exist');
	}
	

	// keep startup url (in case your app is an SPA with html5 url routing)
	var initialHref = window.location.href;

	function restartApplication() {
		//console.log("initialHref-- " + initialHref);
	  // Show splash screen (useful if your app takes time to load) 
	  // navigator.splashscreen.show();
	  // Reload original app url (ie your index.html file)
	  // window.location = initialHref; // Alternative
	  
	  document.location.href = 'index.html'; // Alternative
	  // location.reload(); // Alternative
	}
	
	function downloadAttrImages(){
		attrImageIndex = 0;
		getAttrImagesDataFromDB();
		$('.labelAttrImgloader').html('Loading...');
	}
	
	function syncAttrImages(){
		connectionType = checkConnection();
		if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
			$('#downloadAttrImg').hide();
			$('#downloadAttrsyn').prop("disabled",true);
			$('.labelAttrloader').html('Loading...');
			getAttrImagesDataFromServer();
		}else{
			alert('Please connect the Internet.');
		}
	}

	function getAttrImagesDataFromDB(){
		db.transaction(	function (tx){
			var len = 0;
			// id, attr_id, server_img_id, name, image, status, sort_order, download_status, update_timestamp
				tx.executeSql('select * from attr_images where download_status = 0 ',[],function(tx,results){
						len = results.rows.length;
						if(len>0){
							attrImagesArrSession = [];
							for (var i = 0; i < len; i++) {
								var jsonStaticObj={};
								jsonStaticObj['id'] = results.rows.item(i)['id'];
								jsonStaticObj['attr_id'] = results.rows.item(i)['attr_id'];
								jsonStaticObj['server_img_id'] = results.rows.item(i)['server_img_id'];
								jsonStaticObj['name'] = results.rows.item(i)['name'];
								jsonStaticObj['image'] = results.rows.item(i)['image'];
								jsonStaticObj['status'] = results.rows.item(i)['status'];
								jsonStaticObj['sort_order'] = results.rows.item(i)['sort_order'];
								jsonStaticObj['download_status'] = results.rows.item(i)['download_status'];
								
								
								attrImagesArrSession.push(jsonStaticObj);
							}
						}
					}, errorCB
				);
			},errorCBAttrImagesDownloadDB,successCBAttrImagesDownloadDB);
	}
	
	function successCBAttrImagesDownloadDB(){
		customLoopForAttrImages();
	}
	
	function errorCBAttrImagesDownloadDB(){
		$('.labelAttrImgloader').html('Please download after some time.');
		console.log('errorCBAttrImagesDownloadDB : '+err.code);
		console.log('errorCBAttrImagesDownloadDB : '+err.message);
	}
	

	var attrImageIndex = 0;
	var folderAttrImages = 'attributes';
	function customLoopForAttrImages() {
		if(attrImagesArrSession.length > 0){
			console.log(attrImageIndex+"Delay Condition----optionImg");
		    var image =  attrImagesArrSession[attrImageIndex]['image'];
		    var attrId = attrImagesArrSession[attrImageIndex]['attr_id'];
		    var optionId = attrImagesArrSession[attrImageIndex]['server_img_id'];
		    var downloadFileUrl = attributeImageData + '/' + image;	
			//totalAttrOptImages = parseInt(totalAttrOptImages) + 1;
			downloadFileValidatorFn(downloadFileUrl, folderAttrImages, image, optionId, attrId,0);
			attrImageIndex++;
		    // FIXME TODO Length increase 1000
		    if (attrImageIndex<attrImagesArrSession.length) {setTimeout(function(){customLoopForAttrImages(attrImageIndex);},100);}else{
		    	getAttrImagesDataFromDB();
		    	$('.labelAttrImgloader').html('Completed');
		    }
		}else{
			$('.labelAttrImgloader').html('Completed');
		}
	    
	}
	
	function changeStatusOfAttrImages(imageId){
		db.transaction(	function (tx){
			var len = 0;
			// id, attr_id, server_img_id, name, image, status, sort_order, download_status, update_timestamp
				tx.executeSql('select * from attr_images where server_img_id = '+imageId ,[],function(tx,results){
						len = results.rows.length;
						if(len>0){
							tx.executeSql("UPDATE attr_images SET download_status = 1 WHERE server_img_id = " + imageId + "");
						}
					}, errorCB
				);
			},errorCBAttrImagesUpdateDB,successCBUpdateAttrImageDB);
	}
	
	function successCBUpdateAttrImageDB(){
		console.log('success updated');
	}
	
	function errorCBAttrImagesUpdateDB(err){
		$('.labelAttrImgloader').html('Please download after some time.');
		console.log('errorCBAttrImagesUpdateDB : '+err.code);
		console.log('errorCBAttrImagesUpdateDB : '+err.message);
	}
	
	
	// Gallery Images
	function downloadGalleryImages(){
		gallImgIndex = 0;
		getGalleryImagesDataFromDB();
		$('.labelGalleryImgloader').html('Loading...');
	}
	
	function syncGalleryImages(){
		connectionType = checkConnection();
		if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
			$('#downloadGalleryImg').hide();
			$('#downloadGallerySyn').prop("disabled",true);
			$('.labelGalleryloader').html('Loading...');
			getGalleryImagesDataFromServer();
		}else{
			alert('Please connect the Internet.');
		}
	}

	function getGalleryImagesDataFromDB(){
		db.transaction(	function (tx){
			var len = 0;
				tx.executeSql('select * from gallery_images where download_status = 0 ',[],function(tx,results){
						len = results.rows.length;
						if(len>0){
							galleryImagesArrSession = [];
							for (var i = 0; i < len; i++) {
								var jsonObj={};
								jsonObj['id'] = results.rows.item(i)['id'];
								jsonObj['prod_id'] = results.rows.item(i)['prod_id'];
								jsonObj['server_gall_id'] = results.rows.item(i)['server_gall_id'];
								jsonObj['image'] = results.rows.item(i)['image'];
								
								galleryImagesArrSession.push(jsonObj);
							}
						}
					}, errorCB
				);
			},errorCBGalleryImagesListDB,successCBGalleryImagesDownloadDB);
	}
	
	function successCBGalleryImagesDownloadDB(){
		customLoopForGalleryImages();
	}
	
	function errorCBGalleryImagesListDB(err){
		$('.labelGalleryImgloader').html('Please download after some time.');
		console.log('errorCBGalleryImagesListDB : '+err.code);
		console.log('errorCBGalleryImagesListDB : '+err.message);
	}
	

	var gallImgIndex = 0;
	var folderGallImages = 'gallery';
	function customLoopForGalleryImages() {
		if(galleryImagesArrSession.length > 0){
			console.log(gallImgIndex+ " -- Delay Condition----GalleryImage");
		    var image =  galleryImagesArrSession[gallImgIndex]['image'];
		    var prodId = galleryImagesArrSession[gallImgIndex]['prod_id'];
		    var galleryId = galleryImagesArrSession[gallImgIndex]['server_gall_id'];
		    var downloadFileUrl = productImageData + '/' + image;	
			//totalAttrOptImages = parseInt(totalAttrOptImages) + 1;
			downloadFileValidatorFn(downloadFileUrl, folderGallImages, image, galleryId, prodId, 0);
			gallImgIndex++;
		    // FIXME TODO Length increase 1000
		    if (gallImgIndex<galleryImagesArrSession.length) {setTimeout(function(){customLoopForGalleryImages(gallImgIndex);},100);}else{
		    	getGalleryImagesDataFromDB();
		    	$('.labelGalleryImgloader').html('Completed');
		    }
		}else{
			$('.labelGalleryImgloader').html('Completed');
		}
	}
	
	function changeStatusOfGalleryImages(imageId){
		db.transaction(	function (tx){
			var len = 0;
				tx.executeSql('select * from gallery_images where server_gall_id = '+imageId ,[],function(tx,results){
						len = results.rows.length;
						if(len>0){
							tx.executeSql("UPDATE gallery_images SET download_status = 1 WHERE server_gall_id = " + imageId + "");
						}
					}, errorCB
				);
			},errorCBGalleryImagesUpdateDB,successCBUpdateGalleryImageDB);
	}
	
	function successCBUpdateGalleryImageDB(){
		console.log('success updated');
	}
	
	function errorCBGalleryImagesUpdateDB(err){
		$('.labelGalleryImgloader').html('Please download after some time.');
		console.log('errorCBGalleryImagesUpdateDB : '+err.code);
		console.log('errorCBGalleryImagesUpdateDB : '+err.message);
	}
	
	
