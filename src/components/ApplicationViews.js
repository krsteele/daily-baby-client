import React from "react"
import { Route } from "react-router-dom"
import { ProfileDataProvider } from "./profile/ProfileDataProvider"

import { ProfileDetail } from "./profile/ProfileDetail"


export const ApplicationViews = () => {
    return (
        <>
            <ProfileDataProvider>
                <Route exact path="/profile" render={
                    props => <ProfileDetail {...props} />
                } />
            </ProfileDataProvider>
        </>
    )
}
