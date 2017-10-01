package guru.springframework.domain;

import lombok.Data;

@Data
public class Datas {
    private String date;
    private String usd;
    private String eur;
    private String aud;
    private String gbp;
    private String cny;
    private String rub;
    private String krw;
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getUsd() {
		return usd;
	}
	public void setUsd(String usd) {
		this.usd = usd;
	}
	public String getEur() {
		return eur;
	}
	public void setEur(String eur) {
		this.eur = eur;
	}
	public String getAud() {
		return aud;
	}
	public void setAud(String aud) {
		this.aud = aud;
	}
	public String getGbp() {
		return gbp;
	}
	public void setGbp(String gbp) {
		this.gbp = gbp;
	}
	public String getCny() {
		return cny;
	}
	public void setCny(String cny) {
		this.cny = cny;
	}
	public String getRub() {
		return rub;
	}
	public void setRub(String rub) {
		this.rub = rub;
	}
	public String getKrw() {
		return krw;
	}
	public void setKrw(String krw) {
		this.krw = krw;
	}
}