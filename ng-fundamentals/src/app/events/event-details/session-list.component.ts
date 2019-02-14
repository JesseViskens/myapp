import { Component, Input, OnChanges } from "@angular/core";
import { ISession } from '../shared/index';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/user/auth.service';
import { VoterService } from '../shared/voter.service';

@Component({
    selector: 'session-list',
    templateUrl: './session-list.component.html'
})
export class SessionListComponent implements OnChanges {
    constructor(public auth: AuthService, private voterService: VoterService){}
    @Input() sessions: ISession[];
    @Input() filterBy: string;
    @Input() sortBy: string;
    @Input() eventId: number;
    visibleSessions: ISession[] = [];

    ngOnChanges() {
        //this.sessions= als we sessies hebben dan doen we ...
        if (this.sessions) {
            this.filterSessions(this.filterBy);
            //als je op naam sorteert, ordent hij op namen, (:) anders sorteert hij op stemmen
            this.sortBy === 'name' ? this.visibleSessions.sort(sortByNameAsc) : this.visibleSessions.sort(sortByVotesDesc)
        }
    }
    toggleVote(session: ISession){
        if(this.userHasVoted(session)){
            this.voterService.deleteVoter(session, this.auth.currentUser.userName,this.eventId);
        }
        else{
            this.voterService.addVoter(session, this.auth.currentUser.userName,this.eventId);
        }
        if(this.sortBy === 'votes'){
            this.visibleSessions.sort(sortByVotesDesc);
        }
    }
    userHasVoted(session:ISession ){
        return this.voterService.userHasVoted(session, this.auth.currentUser.userName);
    }

    filterSessions(filter) {
        if (filter === 'all') {
            this.visibleSessions = this.sessions.slice(0);
        } else {
            //we gaan filteren op sessie waar het level van de sessie (session.level) overeen komt met onze filterwaarde die we binnenkrijgen via input. (filterBy)
            this.visibleSessions = this.sessions.filter(session => { return session.level.toLocaleLowerCase() === filter; })
        }
    }
}
//extra functies
function sortByNameAsc(s1: ISession, s2: ISession) {
    if (s1.name > s2.name) {
        return 1;
    } else if (s1.name === s2.name) {
        return 0;
    } else {
        return -1;
    }
}
function sortByVotesDesc(s1: ISession, s2: ISession) {
    return s2.voters.length - s1.voters.length;
}