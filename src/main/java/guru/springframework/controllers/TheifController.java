package guru.springframework.controllers;

import guru.springframework.domain.Datas;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;

import java.net.*;
import java.io.*;
import java.util.regex.Pattern;
import java.util.regex.Matcher;
import java.util.List;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;

@Controller
public class TheifController {
    String[] names = new String[] {"USD","UER","AUD","GBP","CNY","CAD","RUB","KRW"};
    String usd = "USD" , eur = "EUR", aud = "AUD", gbp = "GBP", cny = "CNY", cad = "CAD", rub = "RUB", krw = "KRW";
    String htmlRegex = "<span id=\\\"\\w*\\\">(\\d*,)*\\d*.\\d*<\\/span>";
    String valueRegex = "(\\d+,)*\\d+.\\d+";
    @RequestMapping(value = "/theif")
    public String list(Model model)  throws java.net.MalformedURLException, java.io.IOException{
        ObjectMapper mapper = new ObjectMapper();
        Calendar today = Calendar.getInstance();
        Date date = new Date();
        today.set(Calendar.YEAR,2017);
        today.set(Calendar.MONTH,8);
        today.set(Calendar.DAY_OF_MONTH,20);

        Calendar start = Calendar.getInstance();
         start.set(Calendar.YEAR,2017);
        start.set(Calendar.MONTH,1);
        start.set(Calendar.DAY_OF_MONTH,1);

        List<Datas> all = new ArrayList<Datas>();

        while(start.before(today)){
            int year = start.get(Calendar.YEAR);
            int month = start.get(Calendar.MONTH);
            int day = start.get(Calendar.DAY_OF_MONTH);
            Pattern htmlPattern = Pattern.compile(htmlRegex);
            Pattern valuePattern = Pattern.compile(valueRegex);
            URL oracle = new URL("https://www.mongolbank.mn/dblistofficialdailyrate.aspx?vYear="+year+"&vMonth="+month+"&vDay="+day+"");
            BufferedReader in = new BufferedReader(new InputStreamReader(oracle.openStream()));
            
            String inputLine;
            
            int i = 0;
            
            Datas f = new Datas();
            f.setDate((year+"-"+month+"-"+day).toString());
            while ((inputLine = in.readLine()) != null)
            {
                Matcher row = htmlPattern.matcher(inputLine);
                if(row.find()){
                    String htmlString = row.group(0);
                    
                    Matcher value = valuePattern.matcher(htmlString);
                    switch(i){
                        case 0: // USD
                            System.out.println(htmlString);
                            if(value.find())
                                f.setUsd(value.group(0));
                            break;
                        case 1: // EUR
                            if(value.find())
                                f.setEur(value.group(0));
                            break;
                        case 5: //  GBP
                            if(value.find())
                                f.setGbp(value.group(0));
                            break;
                        case 11: //RUB
                            if(value.find())
                                f.setRub(value.group(0));
                            break;
                        case 13: // CNY
                            if(value.find())
                                f.setCny(value.group(0));
                            break;
                        case 14: // KRW
                            if(value.find())
                                f.setKrw(value.group(0));
                            break;
                        case 17: // AUD 
                            if(value.find())
                                f.setAud(value.group(0));
                            break;
                    }
                    i++;
                }
                
            
            }//end of inner while
            all.add(f);
            start.add(Calendar.DAY_OF_MONTH, 1);
        }


        System.out.println(all.size());
        mapper.writeValue(new File("output.json"), all);


        return "index";
    }

}
