const getCurrentSpainTime = () => {
    // Create a date object in UTC
    const now = new Date();
    // Format options for Spain timezone
    const options = { timeZone: 'Europe/Madrid' };
    // Get date parts in Spain timezone
    const year = now.toLocaleString('es-ES', {...options, year: 'numeric'});
    const month = now.toLocaleString('es-ES', {...options, month: '2-digit'}) - 1; // JS months are 0-based
    const day = now.toLocaleString('es-ES', {...options, day: '2-digit'});
    const hour = now.toLocaleString('es-ES', {...options, hour: '2-digit', hour12: false});
    const minute = now.toLocaleString('es-ES', {...options, minute: '2-digit'});
    const second = now.toLocaleString('es-ES', {...options, second: '2-digit'});
    
    // Create a new date with the Spain time components
    return new Date(year, month, day, hour, minute, second);
  };
  
  // Convert the requested date to Spain's timezone too
  const getDateInSpainTimezone = (dateStr) => {
    const date = new Date(dateStr);
    const options = { timeZone: 'Europe/Madrid' };
    
    const year = date.toLocaleString('es-ES', {...options, year: 'numeric'});
    const month = date.toLocaleString('es-ES', {...options, month: '2-digit'}) - 1;
    const day = date.toLocaleString('es-ES', {...options, day: '2-digit'});
    
    return new Date(year, month, day);
  };

  export { getCurrentSpainTime, getDateInSpainTimezone };