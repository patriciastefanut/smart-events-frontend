import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UserComponent } from './pages/user/user.component';
import { EventsComponent } from './pages/events/events.component';
import { AiEventFormComponent } from './pages/ai-event-form/ai-event-form.component';
import { ManualEventFormComponent } from './pages/manual-event-form/manual-event-form.component';
import { ViewEventComponent } from './pages/view-event/view-event.component';
import { EventOverviewComponent } from './pages/event-overview/event-overview.component';
import { EventInvitationsComponent } from './pages/event-invitations/event-invitations.component';
import { PublicEventInvitationComponent } from './pages/public-event-invitation/public-event-invitation.component';
import { EventSpendingsComponent } from './pages/event-spendings/event-spendings.component';
import { EventParticipantsComponent } from './pages/event-participants/event-participants.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: 'login', component: LoginComponent,
    },
    {
        path: 'register', component: RegisterComponent
    },
    {
        path: '',
        canActivate: [authGuard],
        children: [
            {
                path: 'account', component: UserComponent,
            },
            {
                path: 'events', component: EventsComponent,
            },
            {
                path: 'events/create-ai', component: AiEventFormComponent,
            },
            {
                path: 'events/create-manual', component: ManualEventFormComponent,
            },
            {
                path: 'events/:eventId', component: ViewEventComponent,
                children: [
                    {
                        path: '', component: EventOverviewComponent,
                    },
                    {
                        path: 'invitations', component: EventInvitationsComponent,
                    },
                    {
                        path: 'spendings', component: EventSpendingsComponent,
                    },
                    {
                        path: 'participants', component: EventParticipantsComponent,
                    },
                    {
                        path: 'update', component: ManualEventFormComponent,
                    },

                ]
            },
            {
                path: 'events/:eventUUID/invitations/:invitationUUID', component: PublicEventInvitationComponent
            },
            {
                path: 'not-found', component: NotFoundComponent
            },
            {
                path: '**', redirectTo: 'not-found'
            }
        ]
    }
];
