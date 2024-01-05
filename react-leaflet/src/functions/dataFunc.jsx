import { stakeholdersData } from "../assets/data/stakeholdersData"

let communesStakeholders = {
    Antsirabe_I: {},
    Antsirabe_II: {Ambano: 'SANUVA'},
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
                const currentDistrict= communesStakeholders[district]
                const currentCommune = currentDistrict[commune]
                if (!currentCommune) {
                    communesStakeholders = {...communesStakeholders, [district]: {...currentDistrict, [commune] : [stakeholder]} }
                } else {
                    communesStakeholders = {...communesStakeholders, [district]: {...currentDistrict, [commune] : [...currentCommune, stakeholder]} }
                }
            })
        })
    })
    return communesStakeholders
}

export const stakeholdersPerCommune = communesStakeholdersFunc(stakeholdersData)