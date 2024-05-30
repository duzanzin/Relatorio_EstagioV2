    const express = require ('express')
    const ejs = require ('ejs')
    const path = require('path');
    const puppeteer = require('puppeteer');
    const app = express()


    const passengers = [
        {
            name: "Gabriel",
            flightNumber: 7895,
            time: "18h00",
        },

        {
            name: "Edu",
            flightNumber: 7894,
            time: "18h10",
        },

        {
            name: "Rafa",
            flightNumber: 7893,
            time: "18h20",
        },

    ];

    app.get ('/pdf', async (req, res)=>{

        const browser = await puppeteer.launch({headless: true})
        const page = await browser.newPage()

        await page.goto('https://google.com',{
            waitUntil: 'networkidle0'
        })

        await browser.close()

        return res.send('Arquivo gerado com sucesso')
    })


    app.get('/', (req, res) =>{

        const filePath = path.join(__dirname, "print.ejs")
        ejs.renderFile(filePath, {passengers}, (err, html) =>{
            if(err){
                return res.send('Erro na leitura do arquivo')
            }


                // enviar para o navegador
                return res.send("Arquivo gerado com sucesso!")

           
        } )
    }) 

    app.listen(3000)