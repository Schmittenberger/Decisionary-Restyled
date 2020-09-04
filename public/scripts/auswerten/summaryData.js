/*import { mybarchart } from "../scripts/auswerten/summary.js";

window.mybarchart = mybarchart;
mybarchart.destroy();*/


class SummaryData
{
    constructor()
    {
        this.participants = [];
        this.votes = [];
    }

    addVote(label, amount)
    {
        this.votes.push({label: label, amount: amount});
        
    }

    addParticipant(name)
    {
        this.participants.push(name);
    }

    getLabels()
    {
        let result = [];
        this.votes.forEach(element =>
        {
            result.push(element.label);
        });
        return result;
    }

    getAmounts()
    {
        let result = [];
        this.votes.forEach(element =>
        {
            result.push(element.amount);
        });
        return result;
    }
}
