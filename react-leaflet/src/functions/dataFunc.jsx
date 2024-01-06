import { stakeholdersData } from "../assets/data/stakeholdersData"

const communesStakeholdersFunc = (stakeholders) => {
    let communesStakeholders = {};

    for (const [stakeholder, info] of Object.entries(stakeholders)) {
        for (const [district, communes] of Object.entries(info.districts)) {
            for (const commune of communes) {
                const currentDistrict = communesStakeholders[district] || {};
                const currentCommune = currentDistrict[commune] || [];

                communesStakeholders = {
                    ...communesStakeholders,[district]: {
                        ...currentDistrict,[commune]: [...currentCommune, stakeholder]
                    }
                };
            }
        }
    }

    return communesStakeholders;
};

export const stakeholdersPerCommune = communesStakeholdersFunc(stakeholdersData)

export let actualStakeholdersList = []

for (const [stakeholder, info] of Object.entries(stakeholdersData)) {
    const now = Date.now()
    if (info.fin >= now ) {
        actualStakeholdersList = [...actualStakeholdersList, stakeholder]
    }
}

const actualStakeholdersFunc = (stakeholdersPerCommune, actualStakeholdersList) => {
    let actualStakeholdersCommunes = {};
  
    for (const [district, communes] of Object.entries(stakeholdersPerCommune)) {
        actualStakeholdersCommunes[district] = {}
      for (const [commune, stakeholders] of Object.entries(communes)) {
        const filteredStakeholders = stakeholders.filter(stakeholder => actualStakeholdersList.includes(stakeholder));
        actualStakeholdersCommunes[district][commune] = filteredStakeholders
      }
    }
  
    return actualStakeholdersCommunes;
  };

  export const actualStakeholdersPerCommune = actualStakeholdersFunc(stakeholdersPerCommune, actualStakeholdersList)
  