import React from "react"
import { Route } from "react-router-dom"
import { ProfileDataProvider } from "./profile/ProfileDataProvider"
import { ProfileDetail } from "./profile/ProfileDetail"
import { BabyDataProvider } from "./baby/BabyDataProvider"
import { BabyDetail } from "./baby/BabyDetail"


export const ApplicationViews = () => {
    return (
        <>
            <ProfileDataProvider>
                <Route exact path="/profile" render={
                    props => <ProfileDetail {...props} />
                } />
            </ProfileDataProvider>
            <BabyDataProvider>
                
            </BabyDataProvider>
        </>
    )
}
