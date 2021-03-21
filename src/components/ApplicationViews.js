import React from "react"
import { Route } from "react-router-dom"
import { ProfileDataProvider } from "./profile/ProfileDataProvider"
import { ProfileDetail } from "./profile/ProfileDetail"
import { BabyDataProvider } from "./baby/BabyDataProvider"
import { JournalDataProvider } from "./Journal/JournalDataProvider"
import { JournalList } from "./Journal/JournalList"


export const ApplicationViews = () => {
    return (
        <>
            <ProfileDataProvider>
                <Route exact path="/profile" render={
                    props => <ProfileDetail {...props} />
                } />
            </ProfileDataProvider>
            <JournalDataProvider>
                <BabyDataProvider>
                    <Route path="/journal/:babyId(\d+)" render={
                        props => <JournalList {...props} />
                    } />
                    <Route exact path="/journal/create" render={
                            props => <JournalForm {...props} />
                        } />
                    <Route path="/journal/edit/:entryId(\d+)" render={
                        props => <JournalForm {...props} />
                    } />
                </BabyDataProvider>
            </JournalDataProvider>
                
        </>
    )
}
