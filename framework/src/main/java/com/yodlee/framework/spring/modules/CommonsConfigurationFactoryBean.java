
package com.yodlee.framework.spring.modules;

import java.net.URL;
import java.util.Properties;

import org.apache.commons.configuration.CompositeConfiguration;
import org.apache.commons.configuration.Configuration;
import org.apache.commons.configuration.ConfigurationConverter;
import org.apache.commons.configuration.PropertiesConfiguration;
import org.springframework.beans.factory.FactoryBean;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.core.io.Resource;
import org.springframework.util.Assert;

/**
 * FactoryBean which wraps a Commons CompositeConfiguration object for usage
 * with PropertiesLoaderSupport. This allows the configuration object to behave
 * like a normal java.util.Properties object which can be passed on to
 * setProperties() method allowing PropertyOverrideConfigurer and
 * PropertyPlaceholderConfigurer to take advantage of Commons Configuration.
 * 
 * Internally a CompositeConfiguration object is used for merging multiple
 * Configuration objects.
 *
 * @see java.util.Properties
 * @see org.springframework.core.io.support.PropertiesLoaderSupport
 *
 */
public class CommonsConfigurationFactoryBean implements InitializingBean, FactoryBean<Object> {

  private CompositeConfiguration configuration;

  private Configuration[] configurations;

  private Resource[] locations;

  private boolean throwExceptionOnMissing = true;

  public CommonsConfigurationFactoryBean() {
  }

  public CommonsConfigurationFactoryBean(final Configuration configuration) {
    Assert.notNull(configuration);
    this.configuration = new CompositeConfiguration(configuration);
  }

  /**
   * @see org.springframework.beans.factory.FactoryBean#getObject()
   */
  @Override
  public Object getObject() throws Exception {
    return (this.configuration != null) ? ConfigurationConverter.getProperties(this.configuration)
        : null;
  }

  /**
   * @see org.springframework.beans.factory.FactoryBean#getObjectType()
   */
  @Override
  public Class<Properties> getObjectType() {
    return java.util.Properties.class;
  }

  /**
   * @see org.springframework.beans.factory.FactoryBean#isSingleton()
   */
  @Override
  public boolean isSingleton() {
    return true;
  }

  /**
   * @see org.springframework.beans.factory.InitializingBean#afterPropertiesSet()
   */
  @Override
  public void afterPropertiesSet() throws Exception {
    if ((this.configuration == null)
        && ((this.configurations == null) || (this.configurations.length == 0))
        && ((this.locations == null) || (this.locations.length == 0))) {
      throw new IllegalArgumentException("no configuration object or location specified");
    }

    if (this.configuration == null) {
      this.configuration = new CompositeConfiguration();
    }

    this.configuration.setThrowExceptionOnMissing(this.throwExceptionOnMissing);

    if (this.configurations != null) {
      for (final Configuration configuration2 : this.configurations) {
        this.configuration.addConfiguration(configuration2);
      }
    }

    if (this.locations != null) {
      for (final Resource location : this.locations) {
        final URL url = location.getURL();
        final Configuration props = new PropertiesConfiguration(url);
        this.configuration.addConfiguration(props);
      }
    }
  }

  /**
   * @return Returns the configurations.
   */
  public Configuration[] getConfigurations() {
    return this.configurations;
  }

  /**
   * Set the commons configurations objects which will be used as properties.
   * 
   * @param configurations
   */
  public void setConfigurations(final Configuration[] configurations) {
    this.configurations = configurations;
  }

  public Resource[] getLocations() {
    return this.locations;
  }

  /**
   * Shortcut for loading configuration from Spring resources. It will
   * internally create a PropertiesConfiguration object based on the URL
   * retrieved from the given Resources.
   * 
   * @param locations
   */
  public void setLocations(final Resource[] locations) {
    this.locations = locations;
  }

  public boolean isThrowExceptionOnMissing() {
    return this.throwExceptionOnMissing;
  }

  /**
   * Set the underlying Commons CompositeConfiguration throwExceptionOnMissing
   * flag.
   * 
   * @param throwExceptionOnMissing
   */
  public void setThrowExceptionOnMissing(final boolean throwExceptionOnMissing) {
    this.throwExceptionOnMissing = throwExceptionOnMissing;
  }

  /**
   * Getter for the underlying CompositeConfiguration object.
   * 
   * @return
   */
  public CompositeConfiguration getConfiguration() {
    return this.configuration;
  }

}
