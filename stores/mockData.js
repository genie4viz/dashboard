export const airTableData = {
  tableSchemas: [
    {
      id: 'tblqqJxRPcMdqck5z',
      name: 'Projects',
      primaryColumnId: 'fldweth4BhXFTb5ni',
      columns: [
        {
          id: 'fldweth4BhXFTb5ni',
          name: 'Projects',
          type: 'text',
        },
        {
          id: 'fldfkfqIkvFPdywvf',
          name: 'Tasks',
          type: 'foreignKey',
          typeOptions: {
            relationship: 'many',
            foreignTableId: 'tblX2qg994w3A7vfr',
            symmetricColumnId: 'fldhBYRGD5Ew6E8p0',
          },
        },
        {
          id: 'fldjJ1vL9kvN3X1GD',
          name: 'Status',
          type: 'select',
          typeOptions: {
            choiceOrder: [
              'sel9x5rKHboeT0dAI',
              'selmN1L92cRL0Io3T',
              'sel2C7HnlYumw7pzK',
            ],
            choices: {
              sel9x5rKHboeT0dAI: {
                id: 'sel9x5rKHboeT0dAI',
                color: 'grayMedium',
                name: 'Not Started ',
              },
              selmN1L92cRL0Io3T: {
                id: 'selmN1L92cRL0Io3T',
                color: 'yellowMedium',
                name: 'In progress',
              },
              sel2C7HnlYumw7pzK: {
                id: 'sel2C7HnlYumw7pzK',
                color: 'greenDark',
                name: 'Complete',
              },
            },
            disableColors: false,
          },
        },
        {
          id: 'fldTyQuHc4GNiVbXQ',
          name: 'Project Lead',
          type: 'collaborator',
          typeOptions: {
            shouldNotify: false,
          },
        },
        {
          id: 'fldfH6D9QWuH2PLuR',
          name: 'Due Date',
          type: 'date',
          typeOptions: {
            isDateTime: false,
            dateFormat: 'Local',
          },
        },
        {
          id: 'fldKLGboh0444pIy0',
          name: 'Priority',
          type: 'rating',
          description:
            '1 Flag: Low priority\n2 Flags: Medium priority\n3: Flags: Highest priority',
          typeOptions: {
            color: 'yellow',
            icon: 'flag',
            max: 3,
          },
        },
        {
          id: 'fldNS9SzkAOwov2ho',
          name: 'Field 7',
          type: 'text',
        },
        {
          id: 'fldniyozjZVHPYoiK',
          name: 'Field 8',
          type: 'text',
        },
        {
          id: 'fldALFx3kbtuNMuFU',
          name: 'Field 9',
          type: 'text',
        },
        {
          id: 'fldzzaO2v5P5lnGhl',
          name: 'Field 10',
          type: 'text',
        },
        {
          id: 'fldBIcI6y4PWm5z2i',
          name: 'Field 11',
          type: 'text',
        },
        {
          id: 'fld8vdfvxWWSdRnBW',
          name: 'Field 12',
          type: 'text',
        },
        {
          id: 'fldRJndPUXvXHzJVs',
          name: 'Field 13',
          type: 'text',
        },
      ],
      views: [
        {
          id: 'viwYPQZrZhiQrbDR8',
          name: 'All Projects',
          type: 'grid',
          personalForUserId: null,
          description: null,
        },
        {
          id: 'viwNo3gF3urXgPO8C',
          name: 'Incomplete Projects',
          type: 'grid',
          personalForUserId: null,
          description: null,
        },
        {
          id: 'viwUL5Yw4P6PmAyk2',
          name: 'Projects by Status',
          type: 'kanban',
          personalForUserId: null,
          description: null,
        },
        {
          id: 'viwugf9DKRmjJ7Ph5',
          name: 'Project Calendar',
          type: 'calendar',
          personalForUserId: null,
          description: null,
        },
        {
          id: 'viw1QYSrf8s41jq7z',
          name: 'Kanban 2',
          type: 'kanban',
          personalForUserId: null,
          description: null,
        },
      ],
    },
    {
      id: 'tblX2qg994w3A7vfr',
      name: 'Tasks',
      primaryColumnId: 'fldLBKIHq0fPsAJPi',
      columns: [
        {
          id: 'fldLBKIHq0fPsAJPi',
          name: 'Tasks',
          type: 'text',
        },
        {
          id: 'fldBc2JaMZle9yCCE',
          name: 'Due Date',
          type: 'date',
          typeOptions: {
            isDateTime: false,
            dateFormat: 'Local',
          },
        },
        {
          id: 'fldfdkoLMkf2Z6dEn',
          name: 'Done',
          type: 'checkbox',
          typeOptions: {
            color: 'green',
            icon: 'thumbsUp',
          },
        },
        {
          id: 'fldhBYRGD5Ew6E8p0',
          name: 'Project',
          type: 'foreignKey',
          typeOptions: {
            foreignTableId: 'tblqqJxRPcMdqck5z',
            symmetricColumnId: 'fldfkfqIkvFPdywvf',
            relationship: 'many',
          },
        },
        {
          id: 'flde0WhrcGQih4PdF',
          name: 'Attachments',
          type: 'multipleAttachment',
          description: 'Upload any related documents here',
        },
        {
          id: 'fldHlnX2ua7Zui0hG',
          name: 'Notes',
          type: 'multilineText',
        },
        {
          id: 'fld3LnnfwCOsVV6Qq',
          name: 'Task Owner',
          type: 'collaborator',
          typeOptions: {
            shouldNotify: false,
          },
        },
      ],
      views: [
        {
          id: 'viwsEssiSc38dMAyb',
          name: 'Tasks by project',
          type: 'grid',
          personalForUserId: null,
          description: null,
        },
        {
          id: 'viwleuM8SuS7I5ojn',
          name: 'All tasks',
          type: 'grid',
          personalForUserId: null,
          description: null,
        },
        {
          id: 'viwX7XM6TlQYgWvoL',
          name: 'Incomplete Tasks ',
          type: 'calendar',
          personalForUserId: null,
          description: null,
        },
      ],
    },
  ],
  tableDatas: [
    {
      id: 'tblqqJxRPcMdqck5z',
      rows: [
        {
          id: 'recyvgPJ3tqpC8MMh',
          createdTime: '2018-10-19T01:11:43.000Z',
          cellValuesByColumnId: {
            fldKLGboh0444pIy0: 2,
            fldTyQuHc4GNiVbXQ: 'usrk1jS7Zz8mKn9m7',
            fldfH6D9QWuH2PLuR: '2019-01-17T00:00:00.000Z',
            fldfkfqIkvFPdywvf: [
              {
                foreignRowId: 'reciKtLoyF5M1jV5e',
                foreignRowDisplayName: 'Buy new drum kits',
              },
              {
                foreignRowId: 'reci9aqtXgBrvRq2Z',
                foreignRowDisplayName: 'Buy new acoustic foam',
              },
              {
                foreignRowId: 'recHpEn4mQwcJ5cx2',
                foreignRowDisplayName: 'Donate mics and stands',
              },
            ],
            fldjJ1vL9kvN3X1GD: 'sel9x5rKHboeT0dAI',
            fldweth4BhXFTb5ni: 'Q1 Team Outing!',
          },
        },
        {
          id: 'rec6VVaReFD88Isdz',
          createdTime: '2018-10-19T16:46:02.000Z',
          cellValuesByColumnId: {
            fldKLGboh0444pIy0: 1,
            fldTyQuHc4GNiVbXQ: 'usrHRZxRataUm0LLU',
            fldfH6D9QWuH2PLuR: '2018-12-13T00:00:00.000Z',
            fldfkfqIkvFPdywvf: [
              {
                foreignRowId: 'recYiRMD50AaCcpvh',
                foreignRowDisplayName: 'Update homepage photos',
              },
              {
                foreignRowId: 'recWQtt776DIJMQCG',
                foreignRowDisplayName: 'Add new artist request form',
              },
              {
                foreignRowId: 'rec6qZ6M0e09GwYEi',
                foreignRowDisplayName: 'Add latest press mentions',
              },
            ],
            fldweth4BhXFTb5ni: 'Website Revamp',
          },
        },
        {
          id: 'reciNPWRMptZYiz7b',
          createdTime: '2018-11-07T00:09:24.000Z',
          cellValuesByColumnId: {
            fldKLGboh0444pIy0: 2,
            fldTyQuHc4GNiVbXQ: 'usrIIdl8CgiUFEAMb',
            fldfH6D9QWuH2PLuR: '2019-01-03T00:00:00.000Z',
            fldfkfqIkvFPdywvf: [
              {
                foreignRowId: 'recGSFxFer1HFXbMn',
                foreignRowDisplayName: 'Confirm time & date',
              },
              {
                foreignRowId: 'recE6C4PHhsx7LwWo',
                foreignRowDisplayName:
                  'Finalize headcount (including plus ones)',
              },
              {
                foreignRowId: 'rec6lWUKT1DFFVKSZ',
                foreignRowDisplayName:
                  'Send form for allergies/dietary preferences',
              },
            ],
            fldjJ1vL9kvN3X1GD: 'sel9x5rKHboeT0dAI',
            fldweth4BhXFTb5ni: 'Q1 Team Outing!',
          },
        },
        {
          id: 'recF1Out28w4Lgaol',
          createdTime: '2019-01-30T01:23:12.000Z',
          cellValuesByColumnId: {
            fldKLGboh0444pIy0: 3,
            fldTyQuHc4GNiVbXQ: 'usrIIdl8CgiUFEAMb',
            fldfH6D9QWuH2PLuR: '2019-01-24T00:00:00.000Z',
            fldfkfqIkvFPdywvf: [
              {
                foreignRowId: 'recaigQCaKFt0xWNw',
                foreignRowDisplayName: 'Hire another studio producer',
              },
              {
                foreignRowId: 'recsZ2dy9wJu0jErW',
                foreignRowDisplayName: 'Post audio engineer role to job boards',
              },
            ],
            fldjJ1vL9kvN3X1GD: 'selmN1L92cRL0Io3T',
            fldweth4BhXFTb5ni: 'Hiring ',
          },
        },
        {
          id: 'recNcZ8srE5uatVQu',
          createdTime: '2019-03-09T11:48:57.000Z',
          cellValuesByColumnId: {
            fldweth4BhXFTb5ni: 'Website Revamp',
          },
        },
        {
          id: 'rec44bCXSGT5z2AjB',
          createdTime: '2019-03-12T03:39:18.000Z',
          cellValuesByColumnId: {
            fldweth4BhXFTb5ni: 'Hiring ',
          },
        },
        {
          id: 'rec3F4BsmU6f97bhO',
          createdTime: '2019-03-12T08:46:12.000Z',
          cellValuesByColumnId: {
            fldNS9SzkAOwov2ho: 'asdasd',
            fldniyozjZVHPYoiK: 'asdasd',
          },
        },
        {
          id: 'rec4Kn7PShZBxR7HT',
          createdTime: '2019-03-14T14:07:10.000Z',
          cellValuesByColumnId: {
            fldfH6D9QWuH2PLuR: '2018-12-13T00:00:00.000Z',
          },
        },
        {
          id: 'recbyxgPq7VG1L7Zx',
          createdTime: '2019-03-14T14:07:11.000Z',
        },
        {
          id: 'recgUfigrVRUXvQBC',
          createdTime: '2019-03-14T14:07:13.000Z',
        },
        {
          id: 'recOd790viZPhE3C4',
          createdTime: '2019-03-14T14:07:14.000Z',
        },
        {
          id: 'recErxWh03xM5zYZC',
          createdTime: '2019-03-14T14:07:14.000Z',
        },
        {
          id: 'recjDZd09x61S6AmM',
          createdTime: '2019-03-15T05:14:45.000Z',
        },
      ],
      viewDatas: [
        {
          id: 'viwYPQZrZhiQrbDR8',
          filters: {
            conjunction: 'and',
            filterSet: [
              {
                id: 'fltlYYYvjadev7qO7',
                columnId: 'fldTyQuHc4GNiVbXQ',
                operator: '=',
                value: null,
              },
            ],
          },
          lastSortsApplied: {
            sortSet: [],
            shouldAutoSort: true,
            appliedTime: '2018-11-28T17:55:48.207Z',
          },
          groupLevels: null,
          colorConfig: null,
          columnOrder: [
            {
              columnId: 'fldweth4BhXFTb5ni',
              visibility: true,
              width: 330,
            },
            {
              columnId: 'fldTyQuHc4GNiVbXQ',
              visibility: true,
              width: 169,
            },
            {
              columnId: 'fldjJ1vL9kvN3X1GD',
              visibility: true,
              width: 183,
            },
            {
              columnId: 'fldfH6D9QWuH2PLuR',
              visibility: true,
              width: 123,
            },
            {
              columnId: 'fldKLGboh0444pIy0',
              visibility: true,
              width: 115,
            },
            {
              columnId: 'fldfkfqIkvFPdywvf',
              visibility: true,
              width: 552,
            },
            {
              columnId: 'fldRJndPUXvXHzJVs',
              visibility: true,
            },
            {
              columnId: 'fldNS9SzkAOwov2ho',
              visibility: true,
            },
            {
              columnId: 'fldniyozjZVHPYoiK',
              visibility: true,
              width: 274,
            },
            {
              columnId: 'fldALFx3kbtuNMuFU',
              visibility: true,
            },
            {
              columnId: 'fldzzaO2v5P5lnGhl',
              visibility: true,
            },
            {
              columnId: 'fldBIcI6y4PWm5z2i',
              visibility: true,
            },
            {
              columnId: 'fld8vdfvxWWSdRnBW',
              visibility: true,
            },
          ],
          rowOrder: [
            {
              rowId: 'recF1Out28w4Lgaol',
              visibility: true,
            },
            {
              rowId: 'recyvgPJ3tqpC8MMh',
              visibility: true,
            },
            {
              rowId: 'reciNPWRMptZYiz7b',
              visibility: true,
            },
            {
              rowId: 'recNcZ8srE5uatVQu',
              visibility: true,
            },
            {
              rowId: 'rec6VVaReFD88Isdz',
              visibility: true,
            },
            {
              rowId: 'rec4Kn7PShZBxR7HT',
              visibility: true,
            },
            {
              rowId: 'rec44bCXSGT5z2AjB',
              visibility: true,
            },
            {
              rowId: 'rec3F4BsmU6f97bhO',
              visibility: true,
            },
            {
              rowId: 'recgUfigrVRUXvQBC',
              visibility: true,
            },
            {
              rowId: 'recbyxgPq7VG1L7Zx',
              visibility: true,
            },
            {
              rowId: 'recOd790viZPhE3C4',
              visibility: true,
            },
            {
              rowId: 'recErxWh03xM5zYZC',
              visibility: true,
            },
            {
              rowId: 'recjDZd09x61S6AmM',
              visibility: true,
            },
          ],
          frozenColumnCount: 1,
          metadata: {
            grid: {
              rowHeight: 'small',
            },
          },
          description: null,
        },
      ],
    },
  ],
  hasBlockInstallations: true,
  isLastModifiedTimeEnabled: false,
};

export const mockExtractedData = [
  {
    id: 'tblqqJxRPcMdqck5z',
    rows: [
      {
        id: 'recyvgPJ3tqpC8MMh',
        createdTime: '2018-10-19T01:11:43.000Z',
        cellValuesByColumnId: {
          fldKLGboh0444pIy0: 2,
          fldTyQuHc4GNiVbXQ: 'usrk1jS7Zz8mKn9m7',
          fldfH6D9QWuH2PLuR: '2019-01-17T00:00:00.000Z',
          fldfkfqIkvFPdywvf: [
            {
              foreignRowId: 'reciKtLoyF5M1jV5e',
              foreignRowDisplayName: 'Buy new drum kits',
            },
            {
              foreignRowId: 'reci9aqtXgBrvRq2Z',
              foreignRowDisplayName: 'Buy new acoustic foam',
            },
            {
              foreignRowId: 'recHpEn4mQwcJ5cx2',
              foreignRowDisplayName: 'Donate mics and stands',
            },
          ],
          fldjJ1vL9kvN3X1GD: 'sel9x5rKHboeT0dAI',
          fldweth4BhXFTb5ni: 'Q1 Team Outing!',
        },
      },
      {
        id: 'rec6VVaReFD88Isdz',
        createdTime: '2018-10-19T16:46:02.000Z',
        cellValuesByColumnId: {
          fldKLGboh0444pIy0: 1,
          fldTyQuHc4GNiVbXQ: 'usrHRZxRataUm0LLU',
          fldfH6D9QWuH2PLuR: '2018-12-13T00:00:00.000Z',
          fldfkfqIkvFPdywvf: [
            {
              foreignRowId: 'recYiRMD50AaCcpvh',
              foreignRowDisplayName: 'Update homepage photos',
            },
            {
              foreignRowId: 'recWQtt776DIJMQCG',
              foreignRowDisplayName: 'Add new artist request form',
            },
            {
              foreignRowId: 'rec6qZ6M0e09GwYEi',
              foreignRowDisplayName: 'Add latest press mentions',
            },
          ],
          fldweth4BhXFTb5ni: 'Website Revamp',
        },
      },
      {
        id: 'reciNPWRMptZYiz7b',
        createdTime: '2018-11-07T00:09:24.000Z',
        cellValuesByColumnId: {
          fldKLGboh0444pIy0: 2,
          fldTyQuHc4GNiVbXQ: 'usrIIdl8CgiUFEAMb',
          fldfH6D9QWuH2PLuR: '2019-01-03T00:00:00.000Z',
          fldfkfqIkvFPdywvf: [
            {
              foreignRowId: 'recGSFxFer1HFXbMn',
              foreignRowDisplayName: 'Confirm time & date',
            },
            {
              foreignRowId: 'recE6C4PHhsx7LwWo',
              foreignRowDisplayName: 'Finalize headcount (including plus ones)',
            },
            {
              foreignRowId: 'rec6lWUKT1DFFVKSZ',
              foreignRowDisplayName:
                'Send form for allergies/dietary preferences',
            },
          ],
          fldjJ1vL9kvN3X1GD: 'sel9x5rKHboeT0dAI',
          fldweth4BhXFTb5ni: 'Q1 Team Outing!',
        },
      },
      {
        id: 'recF1Out28w4Lgaol',
        createdTime: '2019-01-30T01:23:12.000Z',
        cellValuesByColumnId: {
          fldKLGboh0444pIy0: 3,
          fldTyQuHc4GNiVbXQ: 'usrIIdl8CgiUFEAMb',
          fldfH6D9QWuH2PLuR: '2019-01-24T00:00:00.000Z',
          fldfkfqIkvFPdywvf: [
            {
              foreignRowId: 'recaigQCaKFt0xWNw',
              foreignRowDisplayName: 'Hire another studio producer',
            },
            {
              foreignRowId: 'recsZ2dy9wJu0jErW',
              foreignRowDisplayName: 'Post audio engineer role to job boards',
            },
          ],
          fldjJ1vL9kvN3X1GD: 'selmN1L92cRL0Io3T',
          fldweth4BhXFTb5ni: 'Hiring ',
        },
      },
      {
        id: 'recNcZ8srE5uatVQu',
        createdTime: '2019-03-09T11:48:57.000Z',
        cellValuesByColumnId: {
          fldweth4BhXFTb5ni: 'Website Revamp',
        },
      },
      {
        id: 'rec44bCXSGT5z2AjB',
        createdTime: '2019-03-12T03:39:18.000Z',
        cellValuesByColumnId: {
          fldweth4BhXFTb5ni: 'Hiring ',
        },
      },
      {
        id: 'rec3F4BsmU6f97bhO',
        createdTime: '2019-03-12T08:46:12.000Z',
        cellValuesByColumnId: {
          fldNS9SzkAOwov2ho: 'asdasd',
          fldniyozjZVHPYoiK: 'asdasd',
        },
      },
      {
        id: 'rec4Kn7PShZBxR7HT',
        createdTime: '2019-03-14T14:07:10.000Z',
        cellValuesByColumnId: {
          fldfH6D9QWuH2PLuR: '2018-12-13T00:00:00.000Z',
        },
      },
      {
        id: 'recbyxgPq7VG1L7Zx',
        createdTime: '2019-03-14T14:07:11.000Z',
      },
      {
        id: 'recgUfigrVRUXvQBC',
        createdTime: '2019-03-14T14:07:13.000Z',
      },
      {
        id: 'recOd790viZPhE3C4',
        createdTime: '2019-03-14T14:07:14.000Z',
      },
      {
        id: 'recErxWh03xM5zYZC',
        createdTime: '2019-03-14T14:07:14.000Z',
      },
      {
        id: 'recjDZd09x61S6AmM',
        createdTime: '2019-03-15T05:14:45.000Z',
      },
    ],
    viewDatas: [
      {
        id: 'viwYPQZrZhiQrbDR8',
        filters: {
          conjunction: 'and',
          filterSet: [
            {
              id: 'fltlYYYvjadev7qO7',
              columnId: 'fldTyQuHc4GNiVbXQ',
              operator: '=',
              value: null,
            },
          ],
        },
        lastSortsApplied: {
          sortSet: [],
          shouldAutoSort: true,
          appliedTime: '2018-11-28T17:55:48.207Z',
        },
        groupLevels: null,
        colorConfig: null,
        columnOrder: [
          {
            columnId: 'fldweth4BhXFTb5ni',
            visibility: true,
            width: 330,
          },
          {
            columnId: 'fldTyQuHc4GNiVbXQ',
            visibility: true,
            width: 169,
          },
          {
            columnId: 'fldjJ1vL9kvN3X1GD',
            visibility: true,
            width: 183,
          },
          {
            columnId: 'fldfH6D9QWuH2PLuR',
            visibility: true,
            width: 123,
          },
          {
            columnId: 'fldKLGboh0444pIy0',
            visibility: true,
            width: 115,
          },
          {
            columnId: 'fldfkfqIkvFPdywvf',
            visibility: true,
            width: 552,
          },
          {
            columnId: 'fldRJndPUXvXHzJVs',
            visibility: true,
          },
          {
            columnId: 'fldNS9SzkAOwov2ho',
            visibility: true,
          },
          {
            columnId: 'fldniyozjZVHPYoiK',
            visibility: true,
            width: 274,
          },
          {
            columnId: 'fldALFx3kbtuNMuFU',
            visibility: true,
          },
          {
            columnId: 'fldzzaO2v5P5lnGhl',
            visibility: true,
          },
          {
            columnId: 'fldBIcI6y4PWm5z2i',
            visibility: true,
          },
          {
            columnId: 'fld8vdfvxWWSdRnBW',
            visibility: true,
          },
        ],
        rowOrder: [
          {
            rowId: 'recF1Out28w4Lgaol',
            visibility: true,
          },
          {
            rowId: 'recyvgPJ3tqpC8MMh',
            visibility: true,
          },
          {
            rowId: 'reciNPWRMptZYiz7b',
            visibility: true,
          },
          {
            rowId: 'recNcZ8srE5uatVQu',
            visibility: true,
          },
          {
            rowId: 'rec6VVaReFD88Isdz',
            visibility: true,
          },
          {
            rowId: 'rec4Kn7PShZBxR7HT',
            visibility: true,
          },
          {
            rowId: 'rec44bCXSGT5z2AjB',
            visibility: true,
          },
          {
            rowId: 'rec3F4BsmU6f97bhO',
            visibility: true,
          },
          {
            rowId: 'recgUfigrVRUXvQBC',
            visibility: true,
          },
          {
            rowId: 'recbyxgPq7VG1L7Zx',
            visibility: true,
          },
          {
            rowId: 'recOd790viZPhE3C4',
            visibility: true,
          },
          {
            rowId: 'recErxWh03xM5zYZC',
            visibility: true,
          },
          {
            rowId: 'recjDZd09x61S6AmM',
            visibility: true,
          },
        ],
        frozenColumnCount: 1,
        metadata: {
          grid: {
            rowHeight: 'small',
          },
        },
        description: null,
      },
    ],
  },
  {
    name: 'Example Test',
    fields: [
      {
        name: 'MC',
        type: 'text',
        typeOptions: null,
        values: [
          'MA',
          'TF',
          'ESS',
          'ORD',
          'FIB',
          'MAT',
          'MA',
          'TF',
          'ESS',
          'ORD',
          'FIB',
          'MAT',
          'MA',
          'TF',
          'ESS',
          'ORD',
          'FIB',
          'MAT',
          'MA',
          'TF',
          'ESS',
          'ORD',
          'FIB',
          'MAT',
          'MA',
          'TF',
          'ESS',
          'ORD',
          'FIB',
          'MAT',
          'MA',
          'TF',
          'ESS',
          'ORD',
          'FIB',
          'MAT',
        ],
      },
      {
        name: 'What is 2+2?',
        type: 'text',
        typeOptions: null,
        values: [
          'What C datatypes are 8 bits? (assume i386)',
          'Bagpipes are awesome.',
          'How have the original Henry Hornbostel buildings influenced campus architecture and design in the last 30 years?',
          'Rank the following in their order of operation.',
          'The student activities fee is',
          'Match the lower-case greek letter with its capital form.',
        ],
      },
      {
        name: 4,
        type: 'text',
        typeOptions: null,
        values: ['int', 'true', null, 'Parentheses', 95, 'λ'],
      },
      {
        name: 'correct',
        type: 'text',
        typeOptions: null,
        values: [
          null,
          null,
          null,
          'Exponents',
          'dollars for students enrolled in',
          'Λ',
        ],
      },
      {
        name: 3,
        type: 'text',
        typeOptions: null,
        values: ['float', null, null, 'Division', 19, 'α'],
      },
      {
        name: 'incorrect',
        type: 'text',
        typeOptions: null,
        values: [null, null, null, 'Addition', 'units or more,', 'γ'],
      },
      {
        name: 'Unnamed: 6',
        type: 'text',
        typeOptions: null,
        values: ['double', null, null, null, null, 'Γ'],
      },
      {
        name: 'Unnamed: 7',
        type: 'text',
        typeOptions: null,
        values: [null, null, null, null, null, 'φ'],
      },
      {
        name: 'Unnamed: 8',
        type: 'text',
        typeOptions: null,
        values: ['char', null, null, null, null, 'Φ'],
      },
    ],
  },
  {
    name: 'Format Abbr.',
    fields: [
      {
        name: 'Unnamed: 0',
        type: 'text',
        typeOptions: null,
        values: [
          null,
          null,
          'http://www.cmu.edu/blackboard',
          null,
          'Question Format Abbreviations',
          null,
          'Abbreviation',
          'MC',
          'MA',
          'TF',
          'ESS',
          'ORD',
          'MAT',
          'FIB',
          'FIL',
          'NUM',
          'SR',
          'OP',
          'FIB_PLUS',
          'JUMBLED_SENTENCE',
          'QUIZ_BOWL',
        ],
      },
      {
        name: 'Unnamed: 1',
        type: 'text',
        typeOptions: null,
        values: [
          null,
          null,
          null,
          null,
          null,
          null,
          'Question Type',
          'Multiple Choice',
          'Multiple Answer',
          'True/False',
          'Essay',
          'Ordering',
          'Matching',
          'Fill in the Blank',
          'File response',
          'Numeric Response',
          'Short response',
          'Opinion',
          'Multiple Fill in the Blank',
          'Jumbled Sentence',
          'Quiz Bowl',
        ],
      },
    ],
  },
  {
    name: 'Readme',
    fields: [
      {
        name: 'http://www.cmu.edu/blackboard',
        type: 'text',
        typeOptions: null,
        values: [
          'File Information',
          'Source',
          'http://www.cmu.edu/blackboard/files/evaluate/tests-example.xls',
          'Version',
          '1.0 (January 2012)',
          'Contact',
          'bb-help@andrew.cmu.edu',
          'About',
          'This is an example and template for preparing Blackboard tests offline. See the full directions at: http://www.cmu.edu/blackboard/evaluate#manage_tests/import_questions',
        ],
      },
    ],
  },
  {
    name: 'Attachment Test',
    fields: [
      {
        name: 'attachment1',
        type: 'multipleAttachment',
        typeOptions: null,
        values: [
          'https://cdn.filestackcontent.com/x0kNIDIuRPKsf25X6mHy',
          'https://cdn.filestackcontent.com/x0kNIDIuRPKsf25X6mHy',
        ],
      },
      {
        name: 'attachment2',
        type: 'multipleAttachment',
        typeOptions: null,
        values: [
          'https://cdn.filestackcontent.com/output=format:png,density:15,compress:true/resize=height:36/75bD0H5SgOfkiVu3o8ha',
          'https://cdn.filestackcontent.com/output=format:png,density:15,compress:true/resize=height:36/75bD0H5SgOfkiVu3o8ha',
        ],
      },
      {
        name: 'attachment3',
        type: 'multipleAttachment',
        typeOptions: null,
        values: [
          'https://cdn.filestackcontent.com/output=format:png,density:15,compress:true/resize=height:36/cflCeajmSjaTNByY1tXo',
          'https://cdn.filestackcontent.com/output=format:png,density:15,compress:true/resize=height:36/cflCeajmSjaTNByY1tXo',
        ],
      },
    ],
  },
];
