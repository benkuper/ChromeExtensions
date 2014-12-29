setTimeout(init,2000);

function init()
{
	mod();
	//setTimeout(mod,1000);
}

function cardClicked()
{
	console.log("card click");
	modded = false;
	
}

function mod()
{
	//console.log("modding");
	
	$("div.ep").each(function(index,div)
	{
		
		$(this).addClass("modded");
		
		var epName = $(this).find("p a").first().text().replace("!","");
		var tLink = $("<a href='http://thepiratebay.se/search/"+epName+"/0/7/0'>TPB</a>");
		var epNumber = "";
		var testdiv = $(this).find("p a").first();
		for(var i=0;i<10;i++)
		{
			if(testdiv.text().slice(0,2) == "S:")
			{
				epNumber = testdiv.text();
			}else
			{
				testdiv = testdiv.next();
			}
			
		}
		//console.log(epNumber);
		var matches = epNumber.match(/\d+/g);
		//console.log(matches);
		var season = matches[0];
		if(season.length == 1) season = "0"+season;
		var ep = matches[1];
		if(ep.length == 1) ep = "0"+ep;
		
		
		var fullEpSearch = epName+" S"+season+"E"+ep;
		//console.log(epName);
		
		var tLink = $("<a href='http://thepiratebay.se/search/"+fullEpSearch+"/0/7/0'>TPB</a>");
		tLink.addClass("tpb-link");
		var kLink = $("<a href='https://kickass.so/usearch/"+fullEpSearch+"/?field=seeders&sorder=desc'>KAT</a>");
		kLink.addClass("kat-link");
		
		var modDiv = $("<div class='modDiv'></div>");
		
		modDiv.append(tLink);
		modDiv.append(kLink);
		
		$(this).prepend(modDiv);
		
		var imgURL = chrome.extension.getURL("magnet-icon.png");
		var katImgURL = chrome.extension.getURL("kat16.png");
		
		$.get("https://kickass.so/usearch/"+fullEpSearch+"/?field=seeders&sorder=desc",null,function(data)
		{
			console.log("data !");
			
			
			var result = $(data);
			
			var mLink = result.find("a.imagnet").first();
			console.log("Kat magnet :"+mLink);
			//mLink.find("img").attr("src",katImgURL);
			//mLink.find("img").attr("src","http://icons.iconarchive.com/icons/icojam/onebit/24/magnet-icon.png");
			mLink.html("<img src='"+katImgURL+"'>");//.addClass("kat-magnet");
			//console.log(div);
			modDiv.append($(mLink));
			
			
		});
		
		$.get("http://thepiratebay.se/search/"+fullEpSearch+"/0/7/0'",null,function(data)
		{
			//console.log("data !");
			
			
			var result = $(data);
			
			var mLink = result.find("div.detName").first().next();
			
			mLink.find("img").attr("src",imgURL);
			//mLink.find("img").attr("src","http://icons.iconarchive.com/icons/icojam/onebit/24/magnet-icon.png");
			mLink.find("img").addClass("tpb-magnet");
			//console.log(div);
			modDiv.append(mLink);
			
			
		});
	});
}