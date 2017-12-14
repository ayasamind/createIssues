function newFunction() {
  //シートから入力されたタイトル、ボディを取得する
  SpreadsheetApp.getActiveSpreadsheet();
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getActiveSheet();
  var lastRow = sheet.getLastRow();
  var issueCount = lastRow;
  var title = '';
  var body = '';
  for (var i=2; i<=issueCount; i++){
    for (var j=1; j<3; j++){
     var range = sheet.getRange(i,j);
      if (j==1){
        title = range.getValue();
      } else if (j==2){
        body = range.getValue();
      }
    }
    var issue = {title:title,body:body};
    if (issue != ''){
      sendHttpPost(JSON.stringify(issue));
    }
  }
}

//GithubAPIにPOST
function sendHttpPost(data){
  var data = data;
  var options =
      {
        "method" : "post",
        "payload" : data
      };
  
  urlBuilder();
  if (url != ''){
    UrlFetchApp.fetch(url, options);
  } 
}

//入力されたユーザー名、リポジトリ名、アクセストークンでURLを生成
function urlBuilder(){
  SpreadsheetApp.getActiveSpreadsheet();
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getActiveSheet();
  var username = sheet.getRange(2,6).getValue();
  var repository = sheet.getRange(2,7).getValue();
  var accesstoken = sheet.getRange(2,8).getValue();
  url = "https://api.github.com/repos/"+username+"/"+repository+"/issues?access_token="+accesstoken;
}