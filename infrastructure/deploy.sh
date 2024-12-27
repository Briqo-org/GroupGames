#!/bin/bash
az deployment group create --resource-group GroupGamesResources --template-file main.bicep --parameters @parameters.json