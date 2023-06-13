#FROM mcr.microsoft.com/armv32v7/dotnet/sdk:5.0 AS build-env
FROM mcr.microsoft.com/dotnet/sdk:5.0-bullseye-slim-arm64v8 AS build-env
WORKDIR /app

EXPOSE 5001

# Copy csproj and restore as distinct layers
COPY backend/backend/*.csproj ./

RUN dotnet restore

# Copy everything else and build
COPY ./backend/backend ./

RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:5.0-alpine3.15-arm64v8

WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "backend.dll"]
