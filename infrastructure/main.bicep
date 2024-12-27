@description('Name of the Azure Cosmos DB account')
param cosmosDbAccountName string = 'group-games-db'

@description('Location for the Azure Cosmos DB account')
param location string = resourceGroup().location

@description('The name of the Azure Static Web App')
param staticWebAppName string = 'GroupGamesWebApp'

@description('The name of the Azure SignalR Service instance')
param signalRName string = 'GroupGamesSignalR'

resource staticWebApp 'Microsoft.Web/staticSites@2022-03-01' = {
  name: staticWebAppName
  location: location
  sku: {
    name: 'Free'
  }
  properties: {
    repositoryUrl: 'https://github.com/Briqo-org/GroupGames'
    branch: 'main'
    buildProperties: {
      apiLocation: 'api'
      appLocation: 'static'
      outputLocation: 'dist'
    }
  }
}

resource cosmosDbAccount 'Microsoft.DocumentDB/databaseAccounts@2021-10-15' = {
  name: cosmosDbAccountName
  location: location
  kind: 'GlobalDocumentDB'
  properties: {
    consistencyPolicy: {
      defaultConsistencyLevel: 'Session'
    }
    locations: [
      {
        locationName: location
        failoverPriority: 0
        isZoneRedundant: false
      }
    ]
    databaseAccountOfferType: 'Standard'
    enableFreeTier: true // Enable free tier
    isVirtualNetworkFilterEnabled: false
  }
}

resource signalR 'Microsoft.SignalRService/signalR@2024-03-01' = {
  name: signalRName
  location: location
  sku: {
    name: 'Free_F1'
    tier: 'Free'
  }
}
