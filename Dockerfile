FROM mcr.microsoft.com/dotnet/aspnet:5.0
COPY backend/bin/Release/net5.0/ App/
WORKDIR /App
ENTRYPOINT ["dotnet", "backend.dll"]
