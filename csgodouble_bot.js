//2015 HoffiPL CSGODOUBLEBOT based on https://gist.github.com/williamoliveira/47ab5126448c5a13d57d
////////////CONFING
var initialBetAmount = 1;   //
var mode = '1';             // 1 or 2(1= red-black, red-black same coins number, 2= red-black, red-black, 2x coins all the time)
var betColor = 'red';       // 
//////////////////////////////

function tick()
{
	var a=getStatus();if(a!==lastStatus&&"unknown"!==a){switch(a){case"waiting":bet();break;case"rolled":rolled()}lastStatus=a,printInfo()
}
}function checkBalance()
{
	return getBalance()<currentBetAmount?(console.warn("BANKRUPT! Not enough balance for next bet, aborting."),clearInterval(refreshIntervalId),!1):!0
}
function printInfo()
{
	var a=" \nStatus: "+lastStatus+"\nRolls played: "+currentRollNumber+"\nInitial bet amount: "+initialBetAmount+"\nCurrent bet amount: "+currentBetAmount+"\nLast roll result: "+(null===wonLastRoll()?"-":wonLastRoll()?"won":"lost");console.log(a)
}
function rolled()
{
	return"1"===mode?void one():(two(),void currentRollNumber++)
}
function one()
{
	//currentBetAmount=wonLastRoll()?2*currentBetAmount:initialBetAmount
	currentBetAmount=initialBetAmount
	if(lastBetColor=="red")
	{
		betColor='black'
	}
	else
	{
		
		betColor='red'
	}
}
function two()
{
	//currentBetAmount=wonLastRoll()?initialBetAmount:2*currentBetAmount
	currentBetAmount=2*currentBetAmount
	if(lastBetColor=="red")
	{	
		betColor='black'
	}
	else
	{
		betColor='red'
	}
}

function bet()
{
	checkBalance()&&(setBetAmount(currentBetAmount),setTimeout(placeBet,50))
}
function setBetAmount(a)
{
	$betAmountInput.val(a)
}
function placeBet()
{
	return"red"===betColor?($redButton.click(),void(lastBetColor="red")):($blackButton.click(),void(lastBetColor="black"))
}
function getStatus()
{
	var a=$statusBar.text();if(hasSubString(a,"Rolling in"))return"waiting";if(hasSubString(a,"***ROLLING***"))return"rolling";if(hasSubString(a,"rolled")){var b=parseInt(a.split("rolled")[1]);return lastRollColor=getColor(b),"rolled"}return"unknown"
}
function getBalance()
{
	return parseInt($balance.text())
}
function hasSubString(a,b)
{
	return a.indexOf(b)>-1
}
function getColor(a)
{
	return 0==a?"green":a>=1&&7>=a?"red":"black"
}
function wonLastRoll()
{
	return lastBetColor?lastRollColor===lastBetColor:null
}
var currentBetAmount=initialBetAmount,currentRollNumber=1,lastStatus,lastBetColor,lastRollColor,$balance=$("#balance"),$betAmountInput=$("#betAmount"),$statusBar=$(".progress #banner"),$redButton=$("#panel1-7 .betButton"),$blackButton=$("#panel8-14 .betButton"),refreshIntervalId=setInterval(tick,500);
