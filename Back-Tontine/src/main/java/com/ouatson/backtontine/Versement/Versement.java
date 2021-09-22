package com.ouatson.backtontine.Versement;

import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.ouatson.backtontine.Participants.Participant;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
public class Versement implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    private Long montant;
    private String operateur;
    private Date date;
    @JsonIdentityReference(alwaysAsId = true)
    @ManyToOne
    private Participant participant;

    public Versement() {
    }

    public Versement(Long id, Long montant, String operateur, Date date, Participant participant) {
        this.id = id;
        this.montant = montant;
        this.operateur = operateur;
        this.date = date;
        this.participant = participant;
    }

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public Long getMontant() { return montant; }

    public void setMontant(Long montant) { this.montant = montant; }

    public String getOperateur() { return operateur; }

    public void setOperateur(String operateur) { this.operateur = operateur; }

    public Date getDate() { return date; }

    public void setDate(Date date) { this.date = date; }

    public Participant getParticipant() { return participant; }

    public void setParticipant(Participant participant) { this.participant = participant; }

    @Override
    public String toString() {
        return "Versement{" +
                "id=" + id +
                ", montant=" + montant +
                ", operateur='" + operateur + '\'' +
                ", date=" + date +
                ", participant=" + participant +
                '}';
    }
}
