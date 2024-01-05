import { stakeholdersData } from "../assets/data/stakeholdersData"

let communesStakeholders = {
    Antsirabe_I: {},
    Antsirabe_II: {},
    Betafo: {},
    Mandoto: {},
    Faratsiho: {},
    Antanifotsy: {},
    Ambatolampy: {},
}
 const communesStakeholdersFunc = (stakeholders) => {
    Object.entries(stakeholders).forEach(([stakeholder, info]) => {
        Object.entries(info.districts).forEach(([district, communes]) => {
            communes.map(commune => {
                if (!communesStakeholders[district][commune]) {
                    const currentDistrict = communesStakeholders[district]
                    console.log(currentDistrict)
                    // const currentCommune = currentDistrict[commune]
                    // communesStakeholders = {...communesStakeholders, [district] : {...currentDistrict, }}
                }
                // } else {
                //     const currentZone = zoneIntervenant[zone]
                //     zoneIntervenant = {...zoneIntervenant, [zone]: [...currentZone, key]}
                // }
            })
        })
    })
    return communesStakeholders
}

export const stakeholdersPerCommune = communesStakeholdersFunc(stakeholdersData)