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