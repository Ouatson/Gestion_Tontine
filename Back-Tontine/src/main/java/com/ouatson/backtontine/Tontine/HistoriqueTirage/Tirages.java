package com.ouatson.backtontine.Tontine.HistoriqueTirage;

import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.ouatson.backtontine.Tontine.Tontine;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
public class Tirages implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String emailRetire;
    private String nomRetire;
    private Long montant;
    private Date dateTirage;
    @JsonIdentityReference(alwaysAsId = true)
    @ManyToOne
    private Tontine tontine;

    public Tirages() {
    }

    public Tirages(Long id, String emailRetire, String nomRetire, Long montant, Date dateTirage, Tontine tontine) {
        this.id = id;
        this.emailRetire = emailRetire;
        this.nomRetire = nomRetire;
        this.montant = montant;
        this.dateTirage = dateTirage;
        this.tontine = tontine;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmailRetire() {
        return emailRetire;
    }

    public void setEmailRetire(String emailRetire) {
        this.emailRetire = emailRetire;
    }

    public String getNomRetire() {
        return nomRetire;
    }

    public void setNomRetire(String nomRetire) {
        this.nomRetire = nomRetire;
    }

    public Long getMontant() {
        return montant;
    }

    public void setMontant(Long montant) {
        this.montant = montant;
    }

    public Date getDateTirage() {
        return dateTirage;
    }

    public void setDateTirage(Date dateTirage) { this.dateTirage = dateTirage; }

    public Tontine getTontine() {
        return tontine;
    }

    public void setTontine(Tontine tontine) {
        this.tontine = tontine;
    }

    @Override
    public String toString() {
        return "Tirages{" +
                "id=" + id +
                ", emailRetire='" + emailRetire + '\'' +
                ", nomRetire='" + nomRetire + '\'' +
                ", montant=" + montant +
                ", dateTirage=" + dateTirage +
                ", tontine=" + tontine +
                '}';
    }
}
