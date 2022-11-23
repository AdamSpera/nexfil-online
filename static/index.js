var username = document.querySelector('input').value;
var output = document.getElementById('output-content');
var loading = document.getElementById('loading');
var stopper = false;

function submitUsername() {
  output.innerHTML = '';
  loadingText();
  fetch('/getData', { method: 'POST', body: JSON.stringify({ username: document.querySelector('input').value }) })
    .then(res => res.json())
    .then(res => {
      console.log(res)
      for (var i = 0; i < res.length; i++) {
        var p = document.createElement('p');
        var spanD = document.createElement('span');
        spanD.innerHTML = '[+] ';
        spanD.style.color = '#23c00f';
        var spanU = document.createElement('a');
        spanU.innerHTML = res[i];
        spanU.href = res[i];
        spanU.style.color = '#57d9ce';
        spanU.style.textDecoration = 'none';
        p.appendChild(spanD);
        p.appendChild(spanU);
        output.appendChild(p);
        stopper = true;
      }
    });
}

function loadingText() {
  stopper = false;
  var loadingText = ['|', '/', '-', '\\'];
  var i = 0;
  setInterval(function () {
    if (stopper == true) {
      loading.innerHTML = '&nbsp; > &nbsp;';
      return;
    }
    loading.innerHTML = '&nbsp; ' + loadingText[i] + ' &nbsp;';
    i++;
    if (i == loadingText.length) {
      i = 0;
    }
  }, 200);
  return;
}