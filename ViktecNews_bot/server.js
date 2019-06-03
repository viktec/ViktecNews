const util = require('util');
const express = require('express');
const app = express();
// includiamo la libreria "axios"
const axios = require('axios');

// Includiamo la libreria "body-parser" per gestire le richieste in JSON.
const bodyparser = require('body-parser');
app.use(bodyparser.json());

// Includiamo il modulo "request" per effettuare richieste HTTP
const https = require('https');

app.get ('/', function (req, res) {
    res.status (200) .json ({status: 'ok'});
});

app.post('/', function (req, res)  {
  console.log("Richiesta: " + JSON.stringify(req.body));  
  
  const body = req.body;
  const keyboard = ({ 
                     inline_keyboard:[[{ text: 'news 📰', callback_data : '/news'},{ text: 'recensioni 9️⃣', callback_data : '/recensioni'},{text: 'Web 🌐 ' , url: 'https://viktec.net'}],
                       [{ text: 'guide 🌂', callback_data : '/guide'},{ text: 'games 🎮', callback_data : '/games'},{ text: 'info ❗ ', callback_data : '/info'} ]]
                        }) 
  
if (body.callback_query){ 
       
  const user = req.body.callback_query.message.chat.id;
  const testo = req.body.callback_query.data;
  const nome = req.body.callback_query.from.username
  
  if (testo.match(/info/)) {
        axios.post('https://api.telegram.org/bot'+process.env.BOTTOKEN+'/sendMessage',
                   {
                   chat_id: user,
                   text: 'ViktecNews è un bot programmato per riportarti le ultime dieci news, guide, games e recensioni. Per qualsiasi problema contatta @viktec',
                  reply_markup : keyboard
                   })
          .then(response => {
      // Messaggio postato
      console.log('Message posted')
      res.end('ok')
          
    })
    .catch(err => {
      // ...Messaggio non postato
      console.log('Error :', err)
      res.end('Error :' + err)
    })
      
      }
  
  else if (testo.match (/news/)) { 
       axios.get( 'https://www.viktec.net/wp-json/wp/v2/posts' ,{
         params: {
           categories: '8240'
         }
       })
    
    
  .then(response => {
         for(var i = 0; i < response.data.length; i++)
         axios.post('https://api.telegram.org/bot'+process.env.BOTTOKEN+'/sendMessage',
                   {
                   chat_id: user,
                   text: response.data[i].title.rendered +" \n\t"+ response.data[i].link,
                   reply_markup : keyboard
                   
  })
        .then(response => { 
      // Messaggio postato  
      console.log('Message inviato')
      res.end('ok')
    })
    .catch(err => {
      // ...Messaggio non postato
      console.log('Error :', err)
      res.end('Error :' + err)
    })
    console.log(response.data[0]);
  })
  .catch(error => {
    console.log(error);
  });
    
    
    
 }else if (testo.match (/recensioni/)) { 
       axios.get( 'https://www.viktec.net/wp-json/wp/v2/posts' ,{
         params: {
           categories: '8241'
         }
       })
  .then(response => {
         for(var i = 0; i < response.data.length; i++)
         axios.post('https://api.telegram.org/bot'+process.env.BOTTOKEN+'/sendMessage',
                   {
                   chat_id: user,
                   text: response.data[i].title.rendered +" \n\t"+ response.data[i].link,
                   reply_markup : keyboard
                   })
          .then(response => {
      // Messaggio postato  
      console.log('Message posted')
      res.end('ok')
    })
    .catch(err => {
      // ...Messaggio non postato
      console.log('Error :', err)
      res.end('Error :' + err)
    })
    console.log(response.data[0]);
  })
  .catch(error => {
    console.log(error);
  });
    
 } else if (testo.match (/guide/)) { 
       axios.get( 'https://www.viktec.net/wp-json/wp/v2/posts' ,{
         params: {
           categories: '8250'
         }
       })
  .then(response => {
         for(var i = 0; i < response.data.length; i++)
         axios.post('https://api.telegram.org/bot'+process.env.BOTTOKEN+'/sendMessage',
                   {
                   chat_id: user,
                   text: response.data[i].title.rendered +" \n\t"+ response.data[i].link,
                   reply_markup : keyboard
                   })
          .then(response => {
      // Messaggio postato  
      console.log('Message posted')
      res.end('ok')
    })
    .catch(err => {
      // ...Messaggio non postato
      console.log('Error :', err)
      res.end('Error :' + err)
    })
    console.log(response.data[0]);
  })
  .catch(error => {
    console.log(error);
  });
    
 } else if (testo.match (/games/)) { 
       axios.get( 'https://www.viktec.net/wp-json/wp/v2/posts' ,{
         params: {
           categories: '8245'
         }
       })
  .then(response => {
         for(var i = 0; i < response.data.length; i++)
         axios.post('https://api.telegram.org/bot'+process.env.BOTTOKEN+'/sendMessage',
                   {
                   chat_id: user,
                   text: response.data[i].title.rendered +" \n\t"+ response.data[i].link,
                   reply_markup : keyboard
                   })
          .then(response => {
      // Messaggio postato  
      console.log('Message posted')
      res.end('ok')
    })
    .catch(err => {
      // ...Messaggio non postato
      console.log('Error :', err)
      res.end('Error :' + err)
    })
    console.log(response.data[0]);
  })
  .catch(error => {
    console.log(error);
  });
    
   }
}  
  
else if ( body.message.text) {
  
    const chatid = req.body.message.chat.id; 
    const text = req.body.message.text; 
    const username = req.body.message.from.username 
    
    console.log("Utente in chat " + chatid + " ha scritto '" + text + "'");
    
  
   if (text.match(/start/)) {
        axios.post('https://api.telegram.org/bot'+process.env.BOTTOKEN+'/sendMessage',
                   {
                   chat_id: chatid,
                   text: 'Benvenuto'+'\t'+ username +'\t' + 'in ViktecNews, scopri le ultime news sul mondo della tecnologia, guide e recensioni. Per qualsiasi cosa vai su info',
                   reply_markup : keyboard
        }).then(response => { 
      // Messaggio postato 
      console.log('Message posted')
           console.log()
      res.end('ok')
    })
    .catch(err => {
      // ...Messaggio non postato
      console.log('Error :', err)
      res.end('Error :' + err)
    })
  }else  {
  axios.post('https://api.telegram.org/bot'+process.env.BOTTOKEN+'/sendMessage',
                   {
                   chat_id: chatid,
                   text: 'Carattere errato, utilizza i comandi!',
                   reply_markup : keyboard
  })
    .then(response => {
      // Messaggio postato
      console.log('Message posted')
      res.end('ok')
    })
    .catch(err => {
      // ...Messaggio non postato
      console.log('Error :', err)
      res.end('Error :' + err)
     })
};
} 

     const clientreq = https.request({
    method: 'POST',
    host: 'api.telegram.org',
    url: 'https://api.telegram.org/bot'+process.env.BOTTOKEN+'/setWebhook?url=https://viktecnews.glitch.me/',
    path: '/bot' + process.env.BOTTOKEN + '/getMe'
  },function(resp) {
    // Questa funzione viene richiamata a richiesta eseguita
    if(resp.statusCode != 200) {
      console.log("Richiesta HTTP fallita");
      return;
    }
    console.log("Richiesta HTTP riuscita");
      
      
        var body = '';
    resp.on('data', function(d) {
        body += d;
    });
    resp.on('end', function() {
      // Ora body contiene il contenuto (corpo) della risposta
      console.log("Risposta da API Telegram: " + body);
      
      
      const j = JSON.parse(body);
      // j è un oggetto JavaScript che contiene i dati della risposta
      // ...
    });
  });
   
clientreq.end(); // questa chiamata esegue la richiesta
});


const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});